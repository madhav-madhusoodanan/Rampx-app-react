"use client";
import React from "react";
import Image from "next/image";
import { useSwapContext } from "@/context/Swap.context";
import { Input } from "./ui/input";
import {
  blockInvalidCharDecimalsAllowed,
  shortenTokenSymbol,
} from "@/lib/utils";

interface Props {
  amountType: "input" | "output";
}

// TODO - Add truncate on the token symbols being displayed
// TODO - Check responsiveness issues with logos

const SwapInput = ({ amountType }: Props) => {
  const {
    setIsTokenSelectorModalOpen,
    inputToken,
    outputToken,
    inputAmount,
    setInputAmount,
    outputAmount,
    setOutputAmount,
  } = useSwapContext();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (amountType === "input") {
      setInputAmount(e.target.value);
    } else {
      setOutputAmount(e.target.value);
    }
  };

  return (
    <section className="flex flex-col gap-3 ">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium font-syne">
          {amountType === "input" ? "You are paying" : "To receive"}
        </span>

        {amountType === "input" && (
          <div className="text-[12px]">
            <span>Dextools</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center rounded-xl bg-black px-4 h-[72px] focus-within:shadow-[0_0_6px_rgba(179,207,61,1)] transition-all duration-300">
        <button
          onClick={() => setIsTokenSelectorModalOpen(amountType)}
          className="font-bold "
        >
          {amountType === "input" ? (
            // <div className="rounded-xl text-sm bg-a-charcoal h-10 px-4 flex justify-center items-center gap-4 w-[120px]">
            //   <Image
            //     alt={inputToken.tokenSymbol}
            //     src={inputToken.tokenLogo}
            //     width={28}
            //     height={28}
            //   />
            //   <span>{inputToken.tokenSymbol}</span>
            // </div>
            <div>
              {inputToken.smartContractAddress && inputToken.tokenSymbol ? (
                <div className="rounded-xl text-sm bg-a-charcoal h-10 px-4 flex justify-center items-center gap-4 w-[120px]">
                  {inputToken.tokenLogo ? (
                    <Image
                      alt={inputToken.tokenSymbol}
                      src={inputToken.tokenLogo}
                      width={28}
                      height={28}
                    />
                  ) : (
                    <div className="h-[36px] w-[36px] rounded-full  bg-[#052105] flex justify-center items-center ">
                      <span className="text-xs text-a-fluo font-extrabold text-opacity-50">
                        {shortenTokenSymbol(inputToken.tokenSymbol)}
                      </span>
                    </div>
                  )}
                  <span>{inputToken.tokenSymbol}</span>
                </div>
              ) : (
                <div className="rounded-xl text-sm bg-a-charcoal h-10 px-4 flex justify-center items-center gap-4 w-[120px]">
                  <span>SELECT</span>
                </div>
              )}
            </div>
          ) : (
            <div>
              {outputToken.smartContractAddress && outputToken.tokenSymbol ? (
                <div className="rounded-xl text-sm bg-a-charcoal h-10 px-4 flex justify-center items-center gap-4 w-[120px]">
                  {outputToken.tokenLogo ? (
                    <Image
                      alt={outputToken.tokenSymbol}
                      src={outputToken.tokenLogo}
                      width={28}
                      height={28}
                    />
                  ) : (
                    <div className="h-[36px] w-[36px] rounded-full  bg-[#052105] flex justify-center items-center ">
                      <span className="text-xs text-a-fluo font-extrabold text-opacity-50">
                        {shortenTokenSymbol(outputToken.tokenSymbol)}
                      </span>
                    </div>
                  )}
                  <span>{outputToken.tokenSymbol}</span>
                </div>
              ) : (
                <div className="rounded-xl text-sm bg-a-charcoal h-10 px-4 flex justify-center items-center gap-4 w-[120px]">
                  <span>SELECT</span>
                </div>
              )}
            </div>
          )}
        </button>

        <Input
          type="number"
          placeholder="0.00"
          className="text-end font-semibold placeholder:text-white/25 text-xl min-w-[100px] truncate font-mono"
          onWheel={(e) => e.currentTarget.blur()}
          onKeyDown={blockInvalidCharDecimalsAllowed}
          value={amountType === "input" ? inputAmount : outputAmount}
          onChange={handleAmountChange}
        />
      </div>
    </section>
  );
};

export default SwapInput;

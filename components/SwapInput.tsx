"use client";
import React from "react";
import Image from "next/image";
import { InputOrOutputToken, useSwapContext } from "@/context/Swap.context";
import { Input } from "./ui/input";
import {
  blockInvalidCharDecimalsAllowed,
  shortenTokenSymbol,
} from "@/lib/utils";
import { useDispatch } from "@/store";
import { setIsTokenModalOpen } from "@/store/slices/app";

interface Props {
  tokenType: "input" | "output";
  token?: InputOrOutputToken;
}

// TODO - Add truncate on the token symbols being displayed
// TODO - Check responsiveness issues with logos

const SwapInput = ({ tokenType, token }: Props) => {
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
    if (tokenType === "input") {
      setInputAmount(e.target.value);
    } else {
      setOutputAmount(e.target.value);
    }
  };

  const dispatch = useDispatch();

  return (
    <section className="flex flex-col gap-3 ">
      <h4 className="text-xs font-medium uppercase">
        {tokenType === "input" ? "You are paying" : "To receive"}
      </h4>

      <div
        className="flex justify-between items-center border-[0.5px] border-opacity-50 border-a-fluo bg-[#232418]/50 px-2 h-[64px] focus-within:border-opacity-100 focus-within:hover:shadow-none hover:shadow-[0_0_6px_rgba(179,207,61,1)] transition-all duration-300"
        // design says bg-[#232418]
      >
        {/* {token ? (
          <div className="text-sm bg-[#3F412B] h-11 px-6 flex justify-center items-center gap-2 shadow-lg ">
            {inputToken.tokenLogo ? (
              <Image
                alt={inputToken.tokenSymbol}
                src={inputToken.tokenLogo}
                width={28}
                height={28}
                className="rounded-full"
              />
            ) : (
              <div className="h-[36px] w-[36px] rounded-full  bg-[#052105] flex justify-center items-center ">
                <span className="text-xs text-a-fluo font-extrabold text-opacity-50">
                  {shortenTokenSymbol(inputToken.tokenSymbol)}
                </span>
              </div>
            )}
            <span className="font-normal text-xl">
              {inputToken.tokenSymbol}
            </span>
          </div>
        ) : (
          <div className="text-sm bg-[#3F412B] h-11 shadow-lg px-6 flex justify-center items-center gap-2 ">
            <span>SELECT</span>
          </div>
        )} */}
        <button
          onClick={() => dispatch(setIsTokenModalOpen(true))}
          className="font-bold "
        >
          {tokenType === "input" ? (
            <div className="hover:shadow-[0_0_8px_rgba(179,207,61,1)] transition-all duration-300">
              {inputToken.smartContractAddress && inputToken.tokenSymbol ? (
                <div
                  className="text-sm bg-[#3F412B] h-11 px-6 flex justify-center items-center gap-2 shadow-lg 
                "
                >
                  {inputToken.tokenLogo ? (
                    <Image
                      alt={inputToken.tokenSymbol}
                      src={inputToken.tokenLogo}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-[36px] w-[36px] rounded-full  bg-[#052105] flex justify-center items-center ">
                      <span className="text-xs text-a-fluo font-extrabold text-opacity-50">
                        {shortenTokenSymbol(inputToken.tokenSymbol)}
                      </span>
                    </div>
                  )}
                  <span className="font-normal text-xl">
                    {inputToken.tokenSymbol}
                  </span>
                </div>
              ) : (
                <div className="text-sm bg-[#3F412B] h-11 shadow-lg px-6 flex justify-center items-center gap-2 ">
                  <span>SELECT</span>
                </div>
              )}
            </div>
          ) : (
            <div className="hover:shadow-[0_0_8px_rgba(179,207,61,1)] transition-all duration-300">
              {outputToken.smartContractAddress && outputToken.tokenSymbol ? (
                <div className="text-sm bg-[#3F412B] h-11 px-6 flex justify-center items-center gap-2 shadow-lg">
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
                <div className="text-sm bg-[#3F412B] h-11 shadow-lg px-6 flex justify-center items-center gap-2 ">
                  <span>SELECT</span>
                </div>
              )}
            </div>
          )}
        </button>

        <Input
          type="number"
          placeholder="0.00"
          className="text-end font-semibold placeholder:text-white/25 text-xl min-w-[100px] truncate lining-nums "
          onWheel={(e) => e.currentTarget.blur()}
          onKeyDown={blockInvalidCharDecimalsAllowed}
          value={tokenType === "input" ? inputAmount : outputAmount}
          onChange={handleAmountChange}
        />
      </div>
    </section>
  );
};

export default SwapInput;

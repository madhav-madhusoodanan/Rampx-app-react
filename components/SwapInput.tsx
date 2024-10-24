import React, { useMemo } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { TokenInfo } from "@/types/tokens";
import { Skeleton } from "@/components/ui/skeleton";
import { validateDecimalPlaces } from "@/lib/utils";
import { AMOUNT_INPUT_REGEX } from "@/constants";

interface Props {
  token?: TokenInfo;
  setAmount: (text: string) => void;
  amount: string;
  editable?: boolean;
  ontokenClick: () => void;
  heading: string;
  loading?: boolean;
  isTokenBInput?: boolean;
}

// TODO - Add truncate on the token symbols being displayed
// TODO - Check responsiveness issues with logos

const SwapInput = ({
  token,
  amount,
  setAmount,
  editable = true,
  ontokenClick,
  heading,
  loading = false,
  isTokenBInput = false,
}: Props) => {
  // const {
  //   setIsTokenSelectorModalOpen,
  //   inputToken,
  //   outputToken,
  //   inputAmount,
  //   setInputAmount,
  //   outputAmount,
  //   setOutputAmount,
  // } = useSwapContext();

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (editable) {
      if (text.match(AMOUNT_INPUT_REGEX)) {
        if (token && validateDecimalPlaces(text, token.decimals)) {
          setAmount(text);
        }
      } else {
        resetInput();
      }
    }
  };

  const showLoading = useMemo(
    () => isTokenBInput && loading,
    [isTokenBInput, loading]
  );

  const resetInput = () => {
    setAmount("");
  };

  return (
    <section className="flex flex-col gap-3 ">
      <h4 className="text-xs font-medium uppercase">{heading}</h4>
      <div
        className="flex justify-between items-center border-[0.5px] border-opacity-50 border-a-fluo bg-[#232418]/50 px-2 h-[64px] focus-within:border-opacity-100 focus-within:hover:shadow-none hover:shadow-[0_0_6px_rgba(179,207,61,1)] transition-all duration-300"
        // design says bg-[#232418]
      >
        <button onClick={ontokenClick} className="font-bold ">
          {token ? (
            <div className="text-sm bg-[#3F412B] h-11 px-6 flex justify-center items-center gap-2 shadow-lg ">
              <Image
                alt={token.symbol}
                src={token.logoURI}
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="font-normal text-xl">{token.symbol}</span>
            </div>
          ) : (
            <div className="text-sm bg-[#3F412B] h-11 shadow-lg px-6 flex justify-center items-center gap-2 ">
              <span>SELECT</span>
            </div>
          )}
        </button>

        {showLoading ? (
          <Skeleton className="h-6 w-[200px]" />
        ) : (
          <Input
            type="number"
            placeholder="0.00"
            className={"text-end font-semibold placeholder:text-white/25 text-xl min-w-[100px] truncate lining-nums ".concat(
              isTokenBInput ? "pointer-events-none" : ""
            )}
            onWheel={(e) => e.currentTarget.blur()}
            // onKeyDown={blockInvalidCharDecimalsAllowed}
            value={amount}
            onChange={onValueChange}
          />
        )}
      </div>
    </section>
  );
};

export default SwapInput;

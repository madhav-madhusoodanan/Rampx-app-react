"use client";
import React from "react";
import { Button } from "./ui/button";
import SwapRefreshIcon from "./custom-icons/SwapRefreshIcon";
import SwapSlippageIcon from "./custom-icons/SwapSlippageIcon";
import SwapArrowsIcon from "./custom-icons/SwapArrowsIcon";
import { SettingsIcon } from "lucide-react";
import SwapInput from "./SwapInput";
import { useSwapContext } from "@/context/Swap.context";

// TODO - check to set either fixed or dynamic widths
// TODO - check to make the middle darker section of gradient wider

const SwapWidget = () => {
  const { handleSwitchTokens } = useSwapContext();

  return (
    <div>
      <div
        className="swap-border-container flex justify-center items-center
        bg-gradient-to-r from-a-fluo from-0% via-[#232323] via-50% to-a-fluo to-100% py-[1px]"
        // className="swap-border-container bg-gradient-to-r from-a-fluo from-30% via-[#232323] via-50% to-a-fluo to-100% mt-20 flex justify-center items-center "
        // TAILWIND EXAMPLES FROM DOCS bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
      >
        <div className="bg-[#232323] swap-container p-8 ">
          <div className="flex justify-between items-center">
            <Button
              className="border-[0.5px] border-a-fluo h-8 w-8 hover:bg-a-fluo group transition-all duration-200"
              size="icon"
            >
              <SwapRefreshIcon className="text-a-fluo group-hover:text-black h-3.5 w-3.5" />
            </Button>

            <div className="flex items-center gap-4">
              <Button className="border-[0.5px] border-a-fluo h-8 hover:bg-a-fluo group transition-all duration-200 flex items-center px-2 gap-2">
                <SwapSlippageIcon className="text-a-fluo group-hover:text-black h-3.5 w-3.5" />
                <span className="lining-nums group-hover:text-black">0.5%</span>
              </Button>

              <Button
                className="border-[0.5px] border-a-fluo h-8 w-8 hover:bg-a-fluo group transition-all duration-200"
                size="icon"
              >
                <SettingsIcon className="text-a-fluo group-hover:text-black h-[18px] w-[18px]" />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <SwapInput tokenType="input" />
          </div>

          {/* DIVISOR */}
          <div className="flex justify-between items-center mt-2">
            <div className="w-[40%] h-[0.5px] bg-a-fluo/30" />

            <Button
              onClick={handleSwitchTokens}
              size="icon"
              className="border-[0.5px] border-a-fluo  h-8 w-8 "
            >
              <SwapArrowsIcon className="text-a-fluo " />
            </Button>

            <div className="w-[40%] h-[0.5px] bg-a-fluo/30 " />
          </div>

          <div className="mt-4">
            <SwapInput tokenType="output" />
          </div>

          {/* 2ND SUBTLE DIVISOR */}
          <div className="w-full h-[0.5px] bg-a-fluo/15 mt-4" />

          <div className="flex justify-center mt-6">
            <button className="border-[0.5px] border-a-fluo/50 text-xl px-10 py-3 text-a-fluo hover:text-black hover:text-shadow-none shadow-[0_0_5px_rgba(179,207,61,1)] hover:shadow-[0_0_10px_rgba(179,207,61,1)] text-shadow-a-fluo text-opacity-30 transition-all duration-300 group relative font-medium">
              <span className="relative z-10">SWAP</span>
              <div className="absolute inset-0 bg-a-fluo z-0 w-0 group-hover:w-full transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapWidget;

"use client";
import React from "react";
import Image from "next/image";
import SwapInput from "../SwapInput";
import SwapOutput from "../SwapOutput";
import { useSwapContext } from "@/context/Swap.context";
// import SwapTokenSelectorModal from "../modals/SwapTokenSelectorModal";

// TODO - Add mobile responsiveness
// TODO - Replace hardcoded data with dynamic data
// TODO - Add various UI edits for selecting currencies and other features
const SwapCard = () => {
  return (
    <div
      className=" bg-gradient-to-r from-[#191919]/50 to-[#000000]/20 rounded-2xl border-[1px] 
    border-gray-500 border-opacity-20 backdrop-blur-xl p-6"
    >
      <SwapInput />

      {/* Divisor */}
      <div className="flex items-center  pt-4 pb-4">
        <div className="w-full h-[0.5px] bg-gradient-to-r from-a-fluo to-white " />
        <Image
          alt="Exchange"
          src="/assets/icons/exchangearrows.svg"
          width={35}
          height={35}
          className="cursor-pointer hover:shadow-[0_0_6px_rgba(179,207,61,1)] rounded-full transition-all duration-300"
        />
        <div className="w-full h-[0.5px] bg-gradient-to-l from-a-fluo to-white " />
      </div>

      <SwapOutput />

      <button
        className="h-[60px] flex justify-center items-center rounded-xl bg-a-fluo w-full text-xl text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-a-fluo to-white hover:border
         hover:border-a-fluo"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default SwapCard;

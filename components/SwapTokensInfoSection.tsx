"use client";

import React from "react";
import SwapTokenInfoCard from "./cards/SwapTokenInfoCard";
import { useSelector } from "@/store";

const SwapTokensInfoSection = () => {
  const tokenA = useSelector((state) => state.swap.tokenA);
  const tokenB = useSelector((state) => state.swap.tokenB);
  return (
    <div className="mt-6">
      <div className="swap-tokens-info-border-container flex justify-center items-center bg-a-fluo py-[1px] relative">
        {/* 
        FADED GRADIENT BORDER TOP + BOTTOM 
        Increase/Decrease the opacity of the gradient to make it more/less visible 👇
        */}
        <div className="h-[1px] w-full absolute top-0 bg-gradient-to-r from-[#232323]/40 via-[#232323] to-[#232323]/40" />
        <div className="h-[2px] w-full absolute bottom-0 bg-gradient-to-r from-[#232323]/40 via-[#232323] to-[#232323]/40" />

        <div className="bg-[#232323] swap-tokens-info-container p-8 flex flex-col gap-4">
          <SwapTokenInfoCard
            tokenLogo={tokenA.logoURI}
            tokenName={tokenA.name}
            tokenSymbol={tokenA.symbol}
            tokenSmartContractAddress={tokenA.address as `0x${string}`}
          />
          {tokenB && (
            <SwapTokenInfoCard
              tokenLogo={tokenB.logoURI}
              tokenName={tokenB.name}
              tokenSymbol={tokenB.symbol}
              tokenSmartContractAddress={tokenB.address as `0x${string}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapTokensInfoSection;

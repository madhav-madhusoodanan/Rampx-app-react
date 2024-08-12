import React from "react";
import SwapTokenInfoCard from "./cards/SwapTokenInfoCard";

const SwapTokensInfoSection = () => {
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
            tokenLogo={"/assets/icons/usdc-logo.png"}
            tokenName={"USD Coin"}
            tokenSymbol={"USDC"}
            tokenSmartContractAddress={
              "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            }
          />
          <SwapTokenInfoCard
            tokenLogo={"/assets/icons/blockchains/sei.svg"}
            tokenName={"SEI Coin"}
            tokenSymbol={"SEI"}
            tokenSmartContractAddress={
              "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SwapTokensInfoSection;

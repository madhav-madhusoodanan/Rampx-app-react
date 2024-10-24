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
              "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
            }
          />
          <SwapTokenInfoCard
            tokenLogo={"/assets/icons/blockchains/sei.svg"}
            tokenName={"Ethereum"}
            tokenSymbol={"ETH"}
            tokenSmartContractAddress={
              "0x000000000000000000000000000000000000000"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SwapTokensInfoSection;

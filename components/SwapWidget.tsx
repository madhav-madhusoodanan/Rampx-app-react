import React from "react";
import SwapHeader from "@/app/(root)/swap/components/swapHeader";
import ExchangeButton from "@/app/(root)/swap/components/exchangeButton";
import TokenAInput from "@/app/(root)/swap/components/tokenAInput";
import TokenBInput from "@/app/(root)/swap/components/tokenBInput";
import SwapActionBtn from "@/app/(root)/swap/components/swapActionBtn";

// TODO - check to set either fixed or dynamic widths
// TODO - check to make the middle darker section of gradient wider

const SwapWidget = () => {
  return (
    <div>
      <div
        className="swap-border-container flex justify-center items-center
       bg-a-fluo py-[1px] relative"
        // className="swap-border-container flex justify-center items-center
        // bg-gradient-to-r from-a-fluo from-0% via-[#232323] via-50% to-a-fluo to-100% py-[1px]"
        // LAST WORKING className
      >
        {/* 
        FADED GRADIENT BORDER TOP + BOTTOM 
        Increase/Decrease the opacity of the gradient to make it more/less visible 👇
        */}
        <div className="h-[3px] w-full absolute top-0 bg-gradient-to-r from-[#232323]/40 via-[#232323] to-[#232323]/40" />
        <div className="h-[1.5px] w-full absolute bottom-0 bg-gradient-to-r from-[#232323]/40 via-[#232323] to-[#232323]/40" />

        <div className="bg-[#232323] swap-container p-8 ">
          <SwapHeader />

          <TokenAInput />

          <ExchangeButton />

          <TokenBInput />

          {/* 2ND SUBTLE DIVISOR */}
          <div className="w-full h-[0.5px] bg-a-fluo/15 mt-4" />

          <SwapActionBtn />
        </div>
      </div>
    </div>
  );
};

export default SwapWidget;

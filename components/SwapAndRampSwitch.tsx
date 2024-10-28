"use client";
import React from "react";

import { cn } from "@/lib/utils";

// TODO - Check to potentially remove fixed width and height className properties
// TODO - Add mobile responsiveness
// TODO - Add functionality for setting and find a place to manage component display and rendering after selection
const SwapAndRampSwitch = () => {
  // const { isSwap, setIsSwap } = useSwapContext();

  return (
    <div className="pb-6">
      <div className="h-[45px] flex justify-center font-semibold">
        <button className="px-4 bg-a-fluo text-black flex justify-center items-center border-[0.5px] border-a-fluo uppercase">
          swap
        </button>
        <button className="px-4 flex justify-center items-center border-[0.5px] border-a-fluo text-a-fluo bg-[#232418]/50 opacity-80 hover:shadow-[0_0_6px_rgba(179,207,61,1)] hover:opacity-100 transition-all duration-300 uppercase">
          on/off ramp
        </button>
      </div>
    </div>
  );
};

export default SwapAndRampSwitch;

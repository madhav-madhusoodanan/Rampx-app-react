"use client";
import React, { useState } from "react";
import SwapAndRampSwitch from "@/components/shared/toggleswitches/SwapAndRampSwitch";
import SwapCard from "@/components/cards/SwapCard";
import Image from "next/image";

const Page = () => {
  const [isSwap, setIsSwap] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-10">
        <div className="flex justify-between items-center pb-3 px-6">
          <div className="text-lg uppercase flex gap-6 ">
            <div className="relative group cursor-pointer">
              buy
              <span className="absolute -bottom-0.5 left-0 w-0 h-1 bg-gradient-to-r from-a-fluo to-white transition-all duration-300 rounded-xl group-hover:w-full"></span>
            </div>
            <div className="relative group cursor-pointer">
              sell
              <span className="absolute -bottom-0.5 left-0 w-0 h-1 bg-gradient-to-r from-a-fluo to-white transition-all duration-300 rounded-xl group-hover:w-full"></span>
            </div>
            <div className="relative group cursor-pointer">
              swap
              <span className="absolute -bottom-0.5 left-0 w-0 h-1 bg-gradient-to-r from-a-fluo to-white transition-all duration-300 rounded-xl group-hover:w-full"></span>
            </div>
          </div>
          <Image
            alt="settings"
            src="/assets/icons/rampsettings.svg"
            width={30}
            height={30}
            className="cursor-pointer hover:shadow-[0_0_15px_rgba(179,207,61,1)] rounded-full transition-all duration-300"
          />
        </div>

        <SwapCard />
      </div>
    </div>
  );
};

export default Page;

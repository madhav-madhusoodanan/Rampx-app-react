"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import SwapRefreshIcon from "@/components/custom-icons/SwapRefreshIcon";
import SwapSlippageIcon from "@/components/custom-icons/SwapSlippageIcon";
import { SettingsIcon } from "lucide-react";
import { fetchSwapPrice } from "@/lib/actions/price.action";

const SwapHeader = () => {
  const refetchPrice = () => {
    fetchSwapPrice();
  };

  return (
    <div className="flex justify-between items-center">
      <Button
        className="border-[0.5px] border-a-fluo h-8 w-8 hover:bg-a-fluo group transition-all duration-200"
        size="icon"
        onClick={refetchPrice}
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
  );
};

export default SwapHeader;

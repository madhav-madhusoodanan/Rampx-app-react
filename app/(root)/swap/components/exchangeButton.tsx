"use client";
import { Button } from "@/components/ui/button";
import SwapArrowsIcon from "@/components/custom-icons/SwapArrowsIcon";
import { useSwapContext } from "@/context/Swap.context";

const ExchangeButton = () => {
  const { handleSwitchTokens } = useSwapContext();

  return (
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
  );
};
export default ExchangeButton;

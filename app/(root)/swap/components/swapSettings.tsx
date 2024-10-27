"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SettingsIcon } from "lucide-react";
import { useDispatch, useSelector } from "@/store";
import { setMaxSlippage, setTransactionDeadline } from "@/store/slices/swap";

const SwapSettings = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAutoSlippage, setIsAutoSlippage] = React.useState(false);

  const maxSlippage = useSelector((state) => state.swap.maxSlippage);
  const txnDeadline = useSelector((state) => state.swap.transactionDeadline);

  const dispatch = useDispatch();

  const handleSlippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (Number(value) <= 50) {
      const maxSlippageInBPS = Number(value);
      dispatch(setMaxSlippage(maxSlippageInBPS));
    }
    setIsAutoSlippage(false);
  };

  const handleAutoClick = () => {
    if (!isAutoSlippage) {
      dispatch(setMaxSlippage(100));
    }
    setIsAutoSlippage(!isAutoSlippage);
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const convertVal = isNaN(Number(value)) ? 0 : Number(value);
    dispatch(setTransactionDeadline(convertVal));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="border-[0.5px] border-a-fluo h-8 w-8 hover:bg-a-fluo group transition-all duration-200"
          size="icon"
        >
          <SettingsIcon className="text-a-fluo group-hover:text-black h-[18px] w-[18px]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 border-a-fluo border-[0.5px] bg-[#3F412B] text-white font-syne">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold capitalize text-center">
            Swap settings
          </h2>
          <div className="space-y-2">
            <div className="text-base text-white">Max slippage</div>
            <div className="flex items-center space-x-2">
              <Button
                variant={isAutoSlippage ? "secondary" : "outline"}
                className={`px-3 py-1 text-sm transition-all duration-200 ${
                  isAutoSlippage
                    ? "bg-a-fluo hover:bg-a-fluo/50"
                    : "border-a-fluo hover:bg-a-fluo"
                }`}
                onClick={handleAutoClick}
              >
                Auto
              </Button>
              <div className="relative flex-1">
                <Input
                  id="slippage"
                  type="number"
                  value={isAutoSlippage ? "1.00" : maxSlippage.toString()}
                  onChange={handleSlippageChange}
                  className="w-full border-[0.5px] border-opacity-50  border-a-fluo bg-[#232418]/50 text-white pr-6"
                  disabled={isAutoSlippage}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-base text-white">Transaction deadline</div>
            <div className="relative">
              <Input
                id="deadline"
                type="number"
                value={txnDeadline}
                onChange={handleDeadlineChange}
                className="w-full border-[0.5px] border-opacity-50 border-a-fluo bg-[#232418]/50 text-white pr-16"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
                minutes
              </span>
            </div>
          </div>
          <Button
            className="w-full border border-a-fluo hover:bg-a-fluo text-white"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SwapSettings;

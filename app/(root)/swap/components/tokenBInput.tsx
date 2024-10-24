"use client";
import React from "react";
import SwapInput from "@/components/SwapInput";
import { useDispatch, useSelector } from "@/store";
import { setTokenAmountB, setTokenSelection } from "@/store/slices/swap";
import { setIsTokenModalOpen } from "@/store/slices/app";
import { TokenSelection } from "@/types/enums";

const TokenBInput = () => {
  const amountB = useSelector((state) => state.swap.amountB);
  const tokenB = useSelector((state) => state.swap.tokenB);
  const tokenSelection = useSelector((state) => state.swap.tokenSelection);
  const isSwapPriceLoading = useSelector(
    (state) => state.swap.isSwapPriceLoading
  );

  const dispatch = useDispatch();

  const handleAmountChange = (amount: string) => {
    dispatch(setTokenAmountB(amount));
  };

  const ontokenClick = () => {
    if (tokenSelection !== TokenSelection.B)
      dispatch(setTokenSelection(TokenSelection.B));
    dispatch(setIsTokenModalOpen(true));
  };

  return (
    <div className="mt-4">
      <SwapInput
        heading="You are paying"
        amount={amountB}
        token={tokenB}
        setAmount={handleAmountChange}
        ontokenClick={ontokenClick}
        isTokenBInput
        loading={isSwapPriceLoading}
      />
      <div className="flex justify-between items-center text-xs px-3 mt-2">
        <p className="text-a-gray">Available</p>
        <p className="text-white lining-nums">0.00 ETH</p>
      </div>
    </div>
  );
};

export default TokenBInput;

"use client";
import React, { useMemo } from "react";
import debounce from "lodash.debounce";
import SwapInput from "@/components/SwapInput";
import { useDispatch, useSelector } from "@/store";
import {
  setIsSwapPriceLoading,
  setTokenAmountA,
  setTokenSelection,
} from "@/store/slices/swap";
import { fetchSwapPrice } from "@/lib/actions/price.action";
import { TokenSelection } from "@/types/enums";
import { setIsTokenModalOpen } from "@/store/slices/app";

const TokenAInput = () => {
  const amountA = useSelector((state) => state.swap.amountA);
  const tokenA = useSelector((state) => state.swap.tokenA);
  const tokenSelection = useSelector((state) => state.swap.tokenSelection);
  const dispatch = useDispatch();

  const debounced = useMemo(
    () =>
      debounce(() => {
        fetchSwapPrice();
      }, 600),
    []
  );

  const handleAmountChange = (amount: string) => {
    dispatch(setTokenAmountA(amount));
    dispatch(setIsSwapPriceLoading(true));
    debounced();
    // CachedService.stopQouteTimer();
  };

  const ontokenClick = () => {
    if (tokenSelection !== TokenSelection.A)
      dispatch(setTokenSelection(TokenSelection.A));
    dispatch(setIsTokenModalOpen(true));
  };

  return (
    <div className="mt-4">
      <SwapInput
        heading="You are paying"
        amount={amountA}
        token={tokenA}
        setAmount={handleAmountChange}
        ontokenClick={ontokenClick}
      />
      <div className="flex justify-between items-center text-xs px-3 mt-2">
        <p className="text-a-gray">Available</p>
        <p className="text-white lining-nums">0.00 ETH</p>
      </div>
    </div>
  );
};

export default TokenAInput;

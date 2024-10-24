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
import { NATIVE_TOKEN_ADDRESS } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTokenAmount } from "@/lib/utils";

const TokenAInput = () => {
  const amountA = useSelector((state) => state.swap.amountA);
  const tokenA = useSelector((state) => state.swap.tokenA);
  const tokenB = useSelector((state) => state.swap.tokenB);
  const tokenSelection = useSelector((state) => state.swap.tokenSelection);
  const nativeBalance = useSelector((state) => state.app.nativeCurrency);
  const tokenBalances = useSelector((state) => state.app.tokenBalances);
  const isBalanceLoading = useSelector(
    (state) => state.loadings.isBalanceLoading
  );
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
    if (tokenB) {
      dispatch(setIsSwapPriceLoading(true));
      debounced();
    }
    // CachedService.stopQouteTimer();
  };

  const ontokenClick = () => {
    if (tokenSelection !== TokenSelection.A)
      dispatch(setTokenSelection(TokenSelection.A));
    dispatch(setIsTokenModalOpen(true));
  };

  const balance = useMemo(() => {
    return tokenA.address === NATIVE_TOKEN_ADDRESS
      ? nativeBalance.balance
      : tokenBalances[tokenA.address] ?? "0";
  }, [tokenBalances, tokenA, nativeBalance.balance]);

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
        {isBalanceLoading ? (
          <Skeleton className="h-4 w-10" />
        ) : (
          <p className="text-white lining-nums">
            {formatTokenAmount(+balance, 2)} {tokenA.symbol}
          </p>
        )}
      </div>
    </div>
  );
};

export default TokenAInput;

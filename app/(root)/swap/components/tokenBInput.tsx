"use client";
import React, { useMemo } from "react";
import SwapInput from "@/components/SwapInput";
import { useDispatch, useSelector } from "@/store";
import { setTokenAmountB, setTokenSelection } from "@/store/slices/swap";
import { setIsTokenModalOpen } from "@/store/slices/app";
import { TokenSelection } from "@/types/enums";
import { NATIVE_TOKEN_ADDRESS } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTokenAmount } from "@/lib/utils";

const TokenBInput = () => {
  const amountB = useSelector((state) => state.swap.amountB);
  const tokenB = useSelector((state) => state.swap.tokenB);
  const tokenSelection = useSelector((state) => state.swap.tokenSelection);
  const nativeBalance = useSelector((state) => state.app.nativeCurrency);
  const tokenBalances = useSelector((state) => state.app.tokenBalances);
  const isBalanceLoading = useSelector(
    (state) => state.loadings.isBalanceLoading
  );
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

  const balance = useMemo(() => {
    return tokenB
      ? tokenB.address === NATIVE_TOKEN_ADDRESS
        ? nativeBalance.balance
        : tokenBalances[tokenB.address] ?? "0"
      : "0";
  }, [tokenB?.address, nativeBalance.balance, tokenBalances]);

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
        editable={false}
      />
      <div
        className={"flex justify-between items-center text-xs px-3 mt-2 ".concat(
          tokenB ? "opacity-1" : "opacity-0"
        )}
      >
        <p className="text-a-gray">Available</p>
        {isBalanceLoading ? (
          <Skeleton className="h-4 w-10" />
        ) : (
          <p className="text-white lining-nums">
            {formatTokenAmount(+balance, 2)} {tokenB?.symbol ?? ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default TokenBInput;

"use client";
import { useToast } from "@/components/ui/use-toast";
import { MAX_ALLOWANCE } from "@/constants";
import { NATIVE_TOKEN_ADDRESS, WRAPPED_COINS_INFO } from "@/constants/tokens";
import { fetchSwapPrice } from "@/lib/actions/price.action";
import { matchTokenAddress } from "@/lib/utils";
import { useDispatch, useSelector } from "@/store";
import { setTxInProgress } from "@/store/slices/loadings";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import React, { useEffect, useMemo } from "react";
import { erc20Abi } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const SwapActionBtn = () => {
  const dispatch = useDispatch();
  const { toast, dismiss: dismissToast } = useToast();

  const walletAddress = useSelector((state) => state.app.walletAddress);
  const swapPrice = useSelector((state) => state.swap.swapPrice);
  const tokenA = useSelector((state) => state.swap.tokenA);
  const tokenB = useSelector((state) => state.swap.tokenB);
  const chainId = useSelector((state) => state.app.chainId);
  const isQouteLoading = useSelector((state) => state.swap.isQouteDataLoading);
  const txProgressing = useSelector((state) => state.loadings.txInProgress);
  const amountA = useSelector((state) => state.swap.amountA);
  const isSwapPriceLoading = useSelector(
    (state) => state.swap.isSwapPriceLoading
  );
  const { open } = useWeb3Modal();

  const onActionBtnClick = () => {
    if (walletAddress) {
      if (isAllowanceIssue) {
        approveToken();
      }
      // else {
      //   CachedService.stopQouteTimer();
      //   getSwapQoute();
      // }
    } else {
      open();
    }
  };

  const spender = useMemo(() => {
    if (swapPrice) {
      const spender = swapPrice.issues?.allowance?.spender;
      if (spender) {
        return spender as `0x${string}`;
      }
    }
    return undefined;
  }, [swapPrice]);

  const showToast = (title: string, description: string) => {
    toast({
      variant: "destructive",
      title: title,
      description: description,
    });
  };

  const {
    data: approvalHash,
    writeContractAsync: writeContract,
    isError: sendApproveError,
  } = useWriteContract();

  const {
    isLoading: isApproveConfirming,
    isSuccess: isApproveConfirmed,
    isError: isApproveConfirmError,
  } = useWaitForTransactionReceipt({
    hash: approvalHash,
  });

  const isAllowanceIssue = useMemo(() => {
    if (swapPrice && swapPrice.issues.allowance) {
      return true;
    }
    return false;
  }, [swapPrice]);

  const isInsufficientBalance = useMemo(() => {
    if (swapPrice && swapPrice.issues.balance) {
      return true;
    }
    return false;
  }, [swapPrice]);

  const wrapUnwrapIntent = useMemo(() => {
    if (
      matchTokenAddress(tokenA.address, NATIVE_TOKEN_ADDRESS) &&
      matchTokenAddress(
        tokenB?.address ?? "",
        WRAPPED_COINS_INFO[chainId].address
      )
    ) {
      return "wrap";
    } else if (
      matchTokenAddress(tokenA.address, WRAPPED_COINS_INFO[chainId].address) &&
      matchTokenAddress(tokenB?.address ?? "", NATIVE_TOKEN_ADDRESS)
    ) {
      return "unwrap";
    }
    return "";
  }, [chainId, tokenA.address, tokenB?.address]);

  const isPriceApiError = useMemo(() => {
    if (swapPrice === undefined) {
      return true;
    }
    return false;
  }, [swapPrice]);

  const buttonText = useMemo(() => {
    return !tokenB
      ? "Select Token"
      : isSwapPriceLoading || isQouteLoading || txProgressing
      ? "Loading..."
      : !amountA
      ? "Enter an amount"
      : isInsufficientBalance
      ? `Insufficient ${tokenA.symbol}`
      : isAllowanceIssue
      ? "Approve"
      : isPriceApiError
      ? "Unable to fetch price"
      : Boolean(wrapUnwrapIntent)
      ? wrapUnwrapIntent
      : "Swap";
  }, [
    isQouteLoading,
    isSwapPriceLoading,
    amountA,
    isInsufficientBalance,
    tokenA.symbol,
    isAllowanceIssue,
    wrapUnwrapIntent,
    txProgressing,
    isPriceApiError,
    tokenB,
  ]);

  const isDisabled = useMemo(
    () =>
      !tokenB ||
      isPriceApiError ||
      isQouteLoading ||
      isSwapPriceLoading ||
      txProgressing ||
      isInsufficientBalance ||
      +amountA === 0,
    [
      isSwapPriceLoading,
      txProgressing,
      isInsufficientBalance,
      amountA,
      isQouteLoading,
      isPriceApiError,
      tokenB,
    ]
  );

  const approveToken = async () => {
    if (spender) {
      dispatch(setTxInProgress(true));
      toast({
        variant: "default",
        title: "Processing Approval",
        description: "Please wait for the approval to be processed",
      });
      await writeContract({
        abi: erc20Abi,
        address: tokenA.address as `0x${string}`,
        functionName: "approve",
        args: [spender, MAX_ALLOWANCE],
      });
    }
  };

  useEffect(() => {
    if (isApproveConfirmed) {
      dispatch(setTxInProgress(false));
      dismissToast();
      toast({
        variant: "default",
        title: "Approval Success",
        description: "Token approved successfully",
      });
      fetchSwapPrice();
    }
  }, [isApproveConfirmed]);

  useEffect(() => {
    if (sendApproveError) {
      dispatch(setTxInProgress(false));
      dismissToast();
      toast({
        variant: "destructive",
        title: "Approval Reject",
        description: "Approval has been rejected",
      });
    }
  }, [sendApproveError]);

  useEffect(() => {
    if (isApproveConfirming) {
      dismissToast();
      toast({
        variant: "default",
        title: "Confirming Approval",
        description: "Please wait for the approval to be confirmed",
      });
    }
  }, [isApproveConfirming]);

  useEffect(() => {
    if (isApproveConfirmError) {
      dispatch(setTxInProgress(false));
      dismissToast();
      toast({
        variant: "destructive",
        title: "Approval Failed",
        description: "Token approval has failed",
      });
    }
  }, [isApproveConfirmError]);

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onActionBtnClick}
        disabled={isDisabled}
        className="border-[0.5px] border-a-fluo/50 text-xl px-10 py-3 text-a-fluo hover:text-black hover:text-shadow-none shadow-[0_0_5px_rgba(179,207,61,1)] hover:shadow-[0_0_10px_rgba(179,207,61,1)] text-shadow-a-fluo text-opacity-30 transition-all duration-300 group relative font-medium"
      >
        <span className="relative z-10">{buttonText}</span>
        <div className="absolute inset-0 bg-a-fluo z-0 w-0 group-hover:w-full transition-all duration-300" />
      </button>
    </div>
  );
};

export default SwapActionBtn;

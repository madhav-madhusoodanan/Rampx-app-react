"use client";
import PriceReviewModal from "@/components/modals/priceReviewModal";
import { useToast } from "@/components/ui/use-toast";
import { MAX_ALLOWANCE, RAMPX_CONTRACT_ADDRESS } from "@/constants";
import { NATIVE_TOKEN_ADDRESS, WRAPPED_COINS_INFO } from "@/constants/tokens";
import { fetchSwapPrice } from "@/lib/actions/price.action";
import { getSwapQoute } from "@/lib/actions/qoute.action";
import { matchTokenAddress } from "@/lib/utils";
import { useDispatch, useSelector } from "@/store";
import { setTxInProgress } from "@/store/slices/loadings";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import React, { useEffect, useMemo, useState } from "react";
import { erc20Abi, parseUnits } from "viem";
import Decimal from "decimal.js";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import rampxAbi from "@/config/rampxAbi.json";

const SwapActionBtn = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast, dismiss: dismissToast } = useToast();

  const walletAddress = useSelector((state) => state.app.walletAddress);
  const swapPrice = useSelector((state) => state.swap.swapPrice);
  const qouteData = useSelector((state) => state.swap.qouteData);
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
      } else {
        getSwapQoute();
      }
    } else {
      open();
    }
  };

  const showToast = (title: string, description: string) => {
    toast({
      variant: "destructive",
      title: title,
      description: description,
    });
  };

  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    refetch: refetchAllowance,
  } = useReadContract({
    address: tokenA.address as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: [walletAddress as `0x${string}`, RAMPX_CONTRACT_ADDRESS],
  });

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
    if (walletAddress && allowance !== undefined) {
      return new Decimal(allowance.toString()).lessThan(
        new Decimal(parseUnits(amountA, tokenA.decimals).toString())
      );
    }
    return false;
  }, [swapPrice, allowance, tokenA]);

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
      : isSwapPriceLoading ||
        isQouteLoading ||
        txProgressing ||
        isAllowanceLoading
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
    isAllowanceLoading,
  ]);

  const isDisabled = useMemo(
    () =>
      Boolean(wrapUnwrapIntent) ||
      isAllowanceLoading ||
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
      isAllowanceLoading,
      wrapUnwrapIntent,
    ]
  );

  const approveToken = async () => {
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
      args: [RAMPX_CONTRACT_ADDRESS, MAX_ALLOWANCE],
    });
  };

  useEffect(() => {
    if (qouteData && !isQouteLoading) {
      if (qouteData.issues?.allowance && qouteData.issues?.balance) {
        const { actual } = qouteData?.issues.allowance;
        const { expected, actual: actualBalance } = qouteData?.issues.balance;
        if (Number(actual) < Number(expected)) {
          showToast(
            "Low Allowance",
            "Your sell amount is less than allowance you have set."
          );
        } else if (actualBalance < expected) {
          showToast(
            "Insufficient Balance",
            "You have insufficient balance to perform this transaction."
          );
        }
      } else {
        setIsModalOpen(true);
      }
    }
  }, [qouteData, isQouteLoading]);

  useEffect(() => {
    if (isApproveConfirmed) {
      dispatch(setTxInProgress(false));
      dismissToast();
      toast({
        variant: "default",
        title: "Approval Success",
        description: "Token approved successfully",
      });
      refetchAllowance();
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

  // const {
  //   data: txReceipt,
  //   writeContractAsync: setRoutersContract,
  //   isError: reouterError,
  // } = useWriteContract();

  // const setRouters = async () => {
  //   await setRoutersContract({
  //     abi: rampxAbi,
  //     address: RAMPX_CONTRACT_ADDRESS as `0x${string}`,
  //     functionName: "setRouters",
  //     args: [
  //       [
  //         "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607",
  //         "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
  //         "0x9fDaaB9312084298d210B8789629D3054230e998",
  //         "0xa102072a4c07f06ec3b4900fdc4c7b80b6c57429",
  //         "0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff",
  //         "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
  //         "0xedf6066a2b290C185783862C7F4776A2C8077AD1",
  //         "0x3a1d87f206d12415f5b0a33e786967680aab4f6d",
  //       ],
  //       true,
  //     ],
  //   });
  // };

  return (
    <>
      <div className="flex justify-center mt-6">
        <button
          onClick={onActionBtnClick}
          // onClick={setRouters}
          disabled={isDisabled}
          className="bg-[#232323] cursor-pointer border-[0.5px] border-a-fluo/50 text-xl px-10 py-3 text-a-fluo hover:text-black hover:text-shadow-none shadow-[0_0_5px_rgba(179,207,61,1)] hover:shadow-[0_0_10px_rgba(179,207,61,1)] text-shadow-a-fluo text-opacity-30 transition-all duration-300 group relative font-medium"
        >
          <span className="relative z-10">{buttonText} </span>
          <div className="absolute inset-0 bg-a-fluo z-0 w-0 group-hover:w-full transition-all duration-300" />
        </button>
      </div>
      <PriceReviewModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default SwapActionBtn;

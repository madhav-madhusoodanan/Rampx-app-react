"use client";

import React, { useEffect } from "react";
import { formatUnits } from "viem";
import Image from "next/image";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "@/store";
import { useToast } from "../ui/use-toast";
import { setTokenAmountA, setTokenAmountB } from "@/store/slices/swap";
import rampxAbi from "@/config/rampxAbi.json";

import { incrementSuccessTxCount } from "@/store/slices/app";
import { setTxInProgress } from "@/store/slices/loadings";
import { SpinningLoader } from "../loaders/Spinner";
import {
  includedDexes,
  NATIVE_TOKEN_ADDRESS,
  RAMPX_CONTRACT_ADDRESS,
} from "@/constants";
import Decimal from "decimal.js";
import { Route } from "@/types/actions";
import { matchTokenAddress } from "@/lib/utils";

const PriceReviewModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const onClose = () => {
    if (!isTxInProgress) {
      setIsOpen(false);
    }
  };

  const dispatch = useDispatch();

  const { toast, dismiss: dismissToast } = useToast();

  const tokenA = useSelector((state) => state.swap.tokenA);
  const tokenB = useSelector((state) => state.swap.tokenB);
  const qouteData = useSelector((state) => state.swap.qouteData);
  const maxSlippage = useSelector((state) => +(state.swap.maxSlippage ?? "0"));
  const transactionDeadline = useSelector(
    (state) => +state.swap.transactionDeadline
  );
  const chainId = useSelector((state) => state.app.chainId);
  const isTxInProgress = useSelector((state) => state.loadings.txInProgress);

  const {
    data: hash,
    writeContractAsync: swapRampX,
    isError: sendTxError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isConfirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const swapTokens = async () => {
    try {
      if (qouteData && maxSlippage) {
        dispatch(setTxInProgress(true));
        toast({
          variant: "default",
          title: "Processing Swap",
          description: "Please wait for the swap to be processed",
        });

        const routerAddresses = extractDexesAddresses(qouteData.route, chainId);

        if (routerAddresses.length === 0) {
          dismissToast();
          toast({
            variant: "destructive",
            title: "InCompatible Dex",
            description: "Cannot swap with incompatible dex",
          });
          dispatch(setTxInProgress(false));
          return;
        }

        const functionName =
          routerAddresses.length > 1
            ? "megaSwap"
            : matchTokenAddress(tokenA.address, NATIVE_TOKEN_ADDRESS)
            ? "swapEthToTokenOnDex"
            : matchTokenAddress(`${tokenB?.address}`, NATIVE_TOKEN_ADDRESS)
            ? "swapTokenToEthOnDex"
            : "swapOnDex";

        const path = qouteData.route.tokens.map((token) => token.address);
        const currentTimeStamp = Math.floor(Date.now() / 1000);

        const deadline = currentTimeStamp + transactionDeadline * 60;

        let routerAddressesTosend, amountsIn, minAmountOut;
        if (functionName === "megaSwap") {
          routerAddressesTosend = routerAddresses;
          // amountsIn = qouteData.route.fills.map((fill) => fill.amountIn);
          // minAmountOut = qouteData.route.fills.map((fill) => fill.minAmountOut);
        } else {
          routerAddressesTosend = routerAddresses[0];
          amountsIn = new Decimal(qouteData.sellAmount).toNumber();
          minAmountOut = new Decimal(qouteData.minBuyAmount).toNumber();
        }

        console.log([
          path,
          routerAddressesTosend,
          amountsIn,
          minAmountOut,
          maxSlippage,
          deadline,
        ]);

        const args = [
          path,
          routerAddressesTosend,
          functionName === "swapEthToTokenOnDex" ? undefined : amountsIn,
          minAmountOut,
          maxSlippage,
          deadline,
        ].filter((arg) => arg !== undefined);

        await swapRampX({
          abi: rampxAbi,
          address: RAMPX_CONTRACT_ADDRESS,
          functionName,
          args,
          value:
            functionName === "swapEthToTokenOnDex"
              ? BigInt(amountsIn ?? 0)
              : undefined,
        });
      }
    } catch (error) {
      console.log("error in swapping ERC-20 Tokens ====", { error });
      dispatch(setTxInProgress(false));
    }
  };

  const extractDexesAddresses = (route: Route, chainId: number) => {
    let dexes: Record<string, string> = {};
    let inCompatibleDexFound = false;

    route.fills.forEach((fill) => {
      if (!includedDexes[chainId]?.[fill.source]) {
        inCompatibleDexFound = true;
      } else {
        dexes[fill.source] = includedDexes[chainId][fill.source];
      }
    });

    if (inCompatibleDexFound) {
      return [];
    }

    return Object.values(dexes);
  };

  useEffect(() => {
    if (isConfirming) {
      dismissToast();
      toast({
        variant: "default",
        title: "Confirming Swap",
        description: "Please wait for the swap to be confirmed",
      });
    }
  }, [isConfirming]);

  useEffect(() => {
    if (isConfirmed) {
      dispatch(incrementSuccessTxCount());
      dispatch(setTxInProgress(false));
      dismissToast();
      setIsOpen(false);
      dispatch(setTokenAmountA(""));
      dispatch(setTokenAmountB(""));
      toast({
        variant: "default",
        title: "Swap Confirmed",
        description: "Your swap has been confirmed",
      });
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (sendTxError) {
      dispatch(setTxInProgress(false));
      dismissToast();
      setIsOpen(false);
      toast({
        variant: "destructive",
        title: "Swap Rejected",
        description: "Your swap has been rejected",
      });
    }
  }, [sendTxError]);

  useEffect(() => {
    if (isConfirmError) {
      dispatch(setTxInProgress(false));
      dismissToast();
      setIsOpen(false);
      toast({
        variant: "destructive",
        title: "Swap Failed",
        description: "Your swap has failed",
      });
    }
  }, [isConfirmError]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-a-charcoal border-a-fluo/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Review Quote
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="text-white">
            <h3 className="font-medium text-white">{`You'll pay`}</h3>
            <div className="flex items-center gap-2">
              <Image
                src={tokenA.logoURI}
                alt={tokenA.name}
                width={0}
                height={0}
                className="w-5 h-5 rounded-full"
              />
              <div>{tokenA.symbol}</div>
              <div>
                {formatUnits(
                  BigInt(qouteData?.sellAmount || 0),
                  tokenA.decimals
                )}
              </div>
            </div>
          </div>
          {tokenB && (
            <div className="text-white mt-3">
              <h3 className="font-medium text-white">{`You'll recieve`}</h3>
              <div className="flex items-center gap-2">
                <Image
                  src={tokenB.logoURI}
                  alt={tokenB.name}
                  width={0}
                  height={0}
                  className="w-5 h-5 rounded-full"
                />
                <div>{tokenB.symbol}</div>
                <div>
                  {formatUnits(
                    BigInt(qouteData?.buyAmount || 0),
                    tokenB.decimals
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-4 w-full">
            <button
              onClick={swapTokens}
              disabled={isTxInProgress}
              className="border-[0.5px] border-a-fluo/50 text-xl px-6 py-2 text-a-fluo hover:text-black hover:text-shadow-none shadow-[0_0_5px_rgba(179,207,61,1)] hover:shadow-[0_0_10px_rgba(179,207,61,1)] text-shadow-a-fluo text-opacity-30 transition-all duration-300 group relative font-medium"
            >
              <span className="relative z-10">
                {isTxInProgress ? (
                  <SpinningLoader className="w-4 h-4 text-a-fluo" />
                ) : (
                  "Confirm"
                )}
              </span>
              <div className="absolute inset-0 bg-a-fluo z-0 w-0 group-hover:w-full transition-all duration-300" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PriceReviewModal;

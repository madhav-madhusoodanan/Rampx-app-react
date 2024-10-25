"use client";

import React, { useEffect } from "react";
import { concat, formatUnits, Hex, numberToHex, size } from "viem";
import Image from "next/image";
import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  useSignTypedData,
} from "wagmi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "@/store";
import { useToast } from "../ui/use-toast";
import { setTokenAmountA, setTokenAmountB } from "@/store/slices/swap";

import { incrementSuccessTxCount } from "@/store/slices/app";
import { setTxInProgress } from "@/store/slices/loadings";
import { SpinningLoader } from "../loaders/Spinner";

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
  const { signTypedDataAsync } = useSignTypedData();

  const { toast, dismiss: dismissToast } = useToast();

  const {
    data: hash,
    error: sendTxError,
    sendTransaction,
  } = useSendTransaction();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isConfirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const tokenA = useSelector((state) => state.swap.tokenA);
  const tokenB = useSelector((state) => state.swap.tokenB);
  const qouteData = useSelector((state) => state.swap.qouteData);
  const walletAddress = useSelector((state) => state.app.walletAddress);
  const chainId = useSelector((state) => state.app.chainId);
  const isTxInProgress = useSelector((state) => state.loadings.txInProgress);

  const swapTokens = async () => {
    try {
      if (qouteData) {
        dispatch(setTxInProgress(true));
        toast({
          variant: "default",
          title: "Processing Swap",
          description: "Please wait for the swap to be processed",
        });

        let modifiedTransactionData = qouteData.transaction.data;

        if (qouteData.permit2?.eip712) {
          let signature: Hex | undefined;
          try {
            signature = await signTypedDataAsync(qouteData.permit2.eip712);
            console.log("Signed permit2 message from quote response");
          } catch (error) {
            console.error("Error signing permit2 coupon:", error);
          }

          // (2) Append signature length and signature data to calldata
          if (signature && qouteData?.transaction?.data) {
            console.log("signature length creating .... ", { signature });
            const signatureLengthInHex = numberToHex(size(signature), {
              signed: false,
              size: 32,
            });

            const transactionData = qouteData.transaction.data as Hex;
            const sigLengthHex = signatureLengthInHex as Hex;
            const sig = signature as Hex;

            modifiedTransactionData = concat([
              transactionData,
              sigLengthHex,
              sig,
            ]);
            console.log({ modifiedTransactionData });
          } else {
            throw new Error("Failed to obtain signature or transaction data");
          }
        }

        console.log("sending transaction ....");
        sendTransaction &&
          sendTransaction({
            account: walletAddress as `0x${string}`,
            gas: !!qouteData.transaction.gas
              ? BigInt(qouteData.transaction.gas)
              : undefined,
            to: qouteData.transaction.to,
            data: modifiedTransactionData, // Use the modified transaction data
            value: qouteData.transaction.value
              ? BigInt(qouteData.transaction.value)
              : undefined, // value is used for native tokens
            chainId,
          });
        console.log("transaction sent !!!!");
      }
    } catch (error) {
      console.log("error in swapping ERC-20 Tokens ====", { error });
      dispatch(setTxInProgress(false));
    }
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
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
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

          <div className="flex justify-end w-full">
            <Button
              className="w-full mt-4"
              disabled={isTxInProgress}
              onClick={swapTokens}
            >
              {isTxInProgress ? (
                <SpinningLoader className="w-4 h-4 text-a-fluo" />
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PriceReviewModal;

"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import { CHAIN_LOGOS } from "@/constants";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { ChainSelectSpinner } from "../loaders/ChainSelectSpinner";

import { useSwitchChain, useAccount } from "wagmi";

interface Props {
  chainName: string;
  chainId: number;
  activeChainId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ChainCard = ({ chainName, chainId, activeChainId, setOpen }: Props) => {
  const { switchChain, status } = useSwitchChain();
  const account = useAccount();

  // console.log(
  //   "HOW IS THIS UNDEFINED",
  //   CHAIN_LOGOS.filter((item) => item.chainId === chainId)[0].imageUrl
  // );

  // console.log("Ze STATUS", chainId);

  useEffect(() => {
    if (status === "success" || status === "error") setOpen(false);
  }, [status]);

  return (
    <button
      onClick={() => switchChain({ chainId: chainId })}
      className="flex flex-col bg-gray-300 bg-opacity-0 hover:bg-opacity-10 px-2 py-2.5  focus:ring-0 focus:outline-none"
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2  ">
          <Image
            src={
              CHAIN_LOGOS.filter((item) => item.chainId === chainId)[0].imageUrl
            }
            width={20}
            height={20}
            alt="chain"
            unoptimized
            className="rounded-full"
          />
          <p
            className={cn(
              "uppercase",
              chainId === activeChainId &&
                status !== "pending" &&
                account.isConnected
                ? "text-a-fluo"
                : ""
            )}
          >
            {chainName === "Ethereum"
              ? "ETH"
              : chainName === "Sei Network"
              ? "SEI"
              : chainName}
          </p>
        </div>

        {chainId === activeChainId &&
          status !== "pending" &&
          account.isConnected && <Check size={20} className="text-a-fluo" />}

        {status === "pending" && (
          <ChainSelectSpinner className="text-a-fluo " />
        )}
      </div>

      {/* {status === "pending" && (
        <p className="text-xs text-gray-500 mt-1 ">Approve in wallet...</p>
      )} */}
    </button>
  );
};

export default ChainCard;

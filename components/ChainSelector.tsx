"use client";
import { useState } from "react";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CHAIN_LOGOS } from "@/constants";
import { ChevronDown } from "lucide-react";

import { useChainId, useSwitchChain } from "wagmi";
import ChainCard from "./cards/ChainCard";
import { cn } from "@/lib/utils";

const ChainSelector = () => {
  const [open, setOpen] = useState(false);
  const { chains } = useSwitchChain();
  const currentChainId = useChainId();

  // console.log("chainID here :", currentChainId);
  // console.log("ZECHAIN", CHAIN_LOGOS);
  // console.log("CHAIN ID RN", currentChainId);
  // console.log(
  //   "ZECHAIN",
  //   CHAIN_LOGOS.filter((item) => item.chainId === currentChainId)[0].imageUrl
  // );

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger
        asChild
        className={cn(
          "w-[75px] md:w-[200px] transition-all duration-150 cursor-pointer group",
          open
            ? "border-a-fluo border-[0.5px]"
            : "hover:shadow-[0_0_8px_rgba(179,207,61,1)]"
        )}
      >
        <div className="flex items-center justify-between bg-[#3F412B] px-3 h-[50px]">
          <div className="flex items-center gap-2">
            <Image
              src={
                CHAIN_LOGOS.filter((item) => item.chainId === currentChainId)[0]
                  .imageUrl
              }
              width={23}
              height={23}
              alt="chain"
              unoptimized
              className="rounded-full"
            />
            <p className="hidden md:block">
              {
                CHAIN_LOGOS.filter((item) => item.chainId === currentChainId)[0]
                  .networkName
              }
            </p>
          </div>
          <ChevronDown
            size={23}
            className={cn(
              "transition-all duration-300",
              open ? "rotate-180 " : "rotate-0"
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="border-a-fluo border-[0.5px] bg-[#3F412B] flex flex-col p-0.5 w-[150px]"
      >
        {chains.map((chain) => (
          <ChainCard
            key={chain.id}
            chainId={chain.id}
            chainName={chain.name}
            activeChainId={currentChainId}
            setOpen={setOpen}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ChainSelector;

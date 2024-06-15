"use client";
import { useState } from "react";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CHAIN_LOGOS } from "@/constants";
import { ChevronDown, Check } from "lucide-react";

import { useChainId, useSwitchChain } from "wagmi";
import ChainCard from "./cards/ChainCard";

const ChainSelector = () => {
  const [open, setOpen] = useState(false);
  const { chains } = useSwitchChain();
  const currentChainId = useChainId();
  console.log("chainID here :", currentChainId);

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 hover:bg-a-fluo hover:bg-opacity-15 transition-all duration-150 p-3 rounded-xl group">
          <Image
            src={
              CHAIN_LOGOS.filter((item) => item.chainId === currentChainId)[0]
                .imageUrl
            }
            width={23}
            height={23}
            alt="chain"
            unoptimized
            className="rounded-[6px]"
          />
          <ChevronDown
            size={23}
            className={`${
              open
                ? "rotate-180 "
                : "rotate-0 text-gray-500 group-hover:text-white"
            } transition-all duration-300`}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="border-[1px] border-gray-500 border-opacity-20 rounded-xl bg-a-charcoal flex flex-col  p-3"
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

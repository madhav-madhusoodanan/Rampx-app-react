"use client";
import React from "react";
import Image from "next/image";
import MobileNav from "@/components/shared/navigation/MobileNav";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { shortenAddress } from "@/lib/utils";
import ChainSelector from "@/components/ChainSelector";

// TODO - Add mobile responsiveness

const Header = () => {
  const { open } = useWeb3Modal();
  const account = useAccount();

  return (
    <header className="bg-a-charcoal bg-opacity-50 ">
      <div className="py-4 px-6 max-w-screen-2xl mx-auto flex justify-between items-center">
        <Image
          alt="logo"
          src="/assets/images/rampx-logo.svg"
          width={150}
          height={150}
          className="object-contain"
        />

        <div className="hidden md:flex items-center gap-10  font-medium">
          <div className="relative group cursor-pointer">
            TRADE
            <span className="absolute -bottom-1 left-0 w-0 h-0.5  bg-gradient-to-r from-a-fluo to-white transition-all duration-300 rounded-xl group-hover:w-full"></span>
          </div>

          <div className="relative group cursor-pointer">
            PERPS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-a-fluo to-white transition-all duration-300 rounded-xl group-hover:w-full"></span>
          </div>

          <div className="flex items-center gap-4">
            <ChainSelector />

            <button
              onClick={() => open()}
              className="border border-a-fluo px-6 py-2 rounded-xl bg-gradient-to-r from-a-fluo to-white bg-clip-text text-transparent 
            hover:bg-a-fluo hover:text-black hover:bg-clip-border hover:bg-none"
            >
              {!account?.isConnected
                ? "Connect Wallet"
                : shortenAddress(account?.address)}
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;

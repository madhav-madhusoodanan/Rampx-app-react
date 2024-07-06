"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MobileNav from "@/components/shared/navigation/MobileNav";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { shortenAddress } from "@/lib/utils";
import ChainSelector from "@/components/ChainSelector";
import Link from "next/link";

// TODO - Add mobile responsiveness

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { open } = useWeb3Modal();
  const account = useAccount();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-a-charcoal  sticky top-0 z-20 ${
        hasScrolled && "border-b border-white/10"
      } `}
    >
      <div className="py-4 px-6 max-w-screen-2xl mx-auto flex justify-between items-center">
        <Image
          alt="logo"
          src="/assets/images/rampx-logo.svg"
          width={150}
          height={150}
          className="object-contain"
        />

        <div className="hidden md:flex items-center gap-10  font-medium">
          <Link href="/explore" className="relative group cursor-pointer">
            EXPLORE
            <span className="absolute -bottom-1 left-0 w-0 h-0.5  bg-gradient-to-r from-a-fluo to-white transition-all duration-300 rounded-xl group-hover:w-full"></span>
          </Link>

          <Link href="/swap" className="relative group cursor-pointer">
            TRADE
            <span className="absolute -bottom-1 left-0 w-0 h-0.5  bg-gradient-to-r from-a-fluo to-white transition-all duration-300 rounded-xl group-hover:w-full"></span>
          </Link>

          <div className="flex items-center gap-4">
            <ChainSelector />

            <button
              onClick={() => open()}
              className="border border-a-fluo px-6 py-2 rounded-xl bg-gradient-to-r from-a-fluo to-white bg-clip-text text-transparent 
            hover:bg-a-fluo hover:text-black hover:bg-clip-border hover:bg-none font-mono"
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

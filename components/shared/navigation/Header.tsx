"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MobileNav from "@/components/shared/navigation/MobileNav";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { shortenAddress } from "@/lib/utils";
import ChainSelector from "@/components/ChainSelector";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import WalletIcon from "@/components/custom-icons/WalletIcon";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// TODO - Add mobile responsiveness

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { open } = useWeb3Modal();
  const account = useAccount();

  const pathname = usePathname();

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
      className={cn(
        "bg-a-charcoal  sticky top-0 z-20",
        hasScrolled && "border-b border-white/10"
      )}
    >
      <div className="py-4 px-6 max-w-screen-2xl mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            alt="logo"
            src="/assets/images/rampx-logo.svg"
            width={150}
            height={150}
            className="object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-10  font-medium">
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              className="uppercase relative group cursor-pointer px-3"
            >
              <p
                className={
                  pathname.startsWith(path)
                    ? "text-a-fluo"
                    : "text-white group-hover:text-a-fluo group-hover:text-shadow-a-fluo"
                }
              >
                {label}
              </p>
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-[1.5px] bg-a-fluo transition-all duration-300 rounded-full",
                  pathname.startsWith(path)
                    ? "w-full"
                    : "w-0 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(179,207,61,1)]"
                )}
              ></span>
            </Link>
          ))}

          <div className="flex items-center gap-4">
            <ChainSelector />

            <button
              onClick={() => open()}
              className={
                !account?.isConnected
                  ? "border border-a-fluo px-6 py-2 h-[50px] text-a-fluo hover:text-black hover:shadow-[0_0_10px_rgba(179,207,61,1)] hover:text-shadow-none text-shadow-a-fluo  relative group transition-all duration-300"
                  : "border-[0.5px] border-opacity-50 border-a-fluo bg-[#3F412B]/50 px-4 py-2 h-[50px] text-a-fluo relative group transition-all duration-300 hover:shadow-[0_0_10px_rgba(179,207,61,1)] "
              }
            >
              {!account?.isConnected ? (
                <>
                  <span className="relative z-10 font-semibold lining-nums">
                    CONNECT WALLET
                  </span>
                  <div className="absolute inset-0 bg-a-fluo z-0 w-0 group-hover:w-full transition-all duration-300" />
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 bg-a-fluo flex justify-center items-center">
                    <WalletIcon className="text-black h-4 w-4" />
                  </div>

                  <span className="relative z-10 font-semibold lining-nums">
                    {shortenAddress(account?.address)}
                  </span>
                </div>
              )}
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

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
import { TwBreakPoints, useTwBreakpoints } from "@/hooks/useTwBreakPoints";
// import { Button } from "@/components/ui/button";

// TODO - Add mobile responsiveness

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { open } = useWeb3Modal();
  const account = useAccount();

  const pathname = usePathname();
  const breakpoint = useTwBreakpoints();

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
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              alt="logo"
              src="/assets/images/rampx-logo.svg"
              width={150}
              height={150}
              className="object-contain hidden md:block"
            />
            <Image
              alt="logo"
              src="/assets/images/rampx-token.png"
              width={30}
              height={30}
              className="object-contain block md:hidden"
            />
          </Link>

          {/* Mobile */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>

        <div className="flex items-center gap-10  font-medium">
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              className="uppercase relative group cursor-pointer px-3 hidden md:block"
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
                  ? "w-[100px] md:w-full text-xs md:text-base border border-a-fluo px-2 md:px-6 py-2 h-[50px] text-a-fluo hover:text-black hover:shadow-[0_0_10px_rgba(179,207,61,1)] hover:text-shadow-none text-shadow-a-fluo  relative group transition-all duration-300"
                  : "w-[100px] md:w-full border-[0.5px] border-opacity-50 border-a-fluo bg-[#3F412B]/50 px-4 py-2 h-[50px] text-a-fluo relative group transition-all duration-300 hover:shadow-[0_0_10px_rgba(179,207,61,1)] "
              }
            >
              {!account?.isConnected ? (
                <>
                  <span className="relative z-10 font-semibold lining-nums">
                    {breakpoint === TwBreakPoints.sm ||
                    breakpoint === TwBreakPoints.xs
                      ? "CONNECT"
                      : "CONNECT WALLET"}
                  </span>
                  <div className="absolute inset-0 bg-a-fluo z-0 w-0 group-hover:w-full transition-all duration-300" />
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 bg-a-fluo justify-center items-center hidden md:flex">
                    <WalletIcon className="text-black h-4 w-4" />
                  </div>

                  <span className="relative z-10 font-semibold lining-nums hidden md:block">
                    {shortenAddress(account?.address)}
                  </span>
                  <span className="relative z-10 font-semibold lining-nums block md:hidden">
                    {shortenAddress(account?.address, 3, 3)}
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

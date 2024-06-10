import React from "react";
import Image from "next/image";
import MobileNav from "@/components/shared/navigation/MobileNav";

const Header = () => {
  // TODO - Add mobile responsiveness
  return (
    <header className="bg-a-charcoal bg-opacity-40 ">
      <div className="p-6 max-w-screen-2xl mx-auto flex justify-between items-center">
        <Image
          alt="logo"
          src="/assets/images/rampx-logo.svg"
          width={200}
          height={200}
          className="object-contain"
        />

        <div className="hidden md:flex items-center gap-10 text-xl font-medium">
          <div className="relative group cursor-pointer">
            TRADE
            <span className="absolute -bottom-1 left-0 w-0 h-0.5  bg-gradient-to-r from-a-fluo to-white transition-all duration-300 rounded-xl group-hover:w-full"></span>
          </div>

          <div className="relative group cursor-pointer">
            PERPS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-a-fluo to-white transition-all duration-300 rounded-xl group-hover:w-full"></span>
          </div>

          <button
            className="border border-a-fluo px-6 py-2 rounded-full bg-gradient-to-r from-a-fluo to-white bg-clip-text text-transparent 
          hover:bg-a-fluo hover:text-black hover:bg-clip-border hover:bg-none"
          >
            Connect Wallet
          </button>
        </div>

        {/* Mobile */}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import Image from "next/image";

const SwapCard = () => {
  // TODO - Add mobile responsiveness
  // TODO - Replace hardcoded data with dynamic data
  // TODO - Add various UI edits for selecting currencies and other features
  return (
    <div
      className="w-[620px]  bg-gradient-to-r from-white/10 to-[#999999]/0 rounded-2xl border-[1px] 
    border-white border-opacity-20 backdrop-blur-lg p-10"
    >
      <section className="flex flex-col gap-3 pr-4">
        <div className="flex justify-between items-center">
          <span className="text-sm pl-4">You are paying</span>

          <div className="text-[12px]">
            <span>Dextools</span>
          </div>
        </div>

        <div className="text-2xl flex justify-between items-center ">
          <div className="rounded-full bg-a-charcoal w-[230px] h-[65px] flex px-12 items-center gap-6">
            <Image
              alt="USDC"
              src="/assets/icons/usdclogo.png"
              width={28}
              height={28}
            />
            <span>AUD</span>
          </div>
          <span>0.00</span>
        </div>
      </section>

      {/* Divisor */}
      <div className="flex items-center px-4 pt-8 pb-4">
        <div className="w-full h-[1px] bg-gradient-to-r from-a-fluo to-white " />
        <Image
          alt="Exchange"
          src="/assets/icons/exchangearrows.svg"
          width={45}
          height={45}
          className="cursor-pointer hover:shadow-[0_0_15px_rgba(179,207,61,1)] rounded-full transition-all duration-300"
        />
        <div className="w-full h-[1px] bg-gradient-to-l from-a-fluo to-white " />
      </div>

      <section className="flex flex-col gap-3 pb-10 pr-4">
        <span className="text-sm pl-4">To receive</span>

        <div className="text-2xl flex justify-between items-center ">
          <div className="rounded-full bg-a-charcoal w-[230px] h-[65px] flex px-12 items-center gap-6">
            <Image
              alt="USDC"
              src="/assets/icons/seilogo.svg"
              width={28}
              height={28}
            />
            <span>SEI</span>
          </div>
          <span>0.00</span>
        </div>
      </section>

      <div className="px-10">
        <button className="h-[75px] flex justify-center items-center rounded-full bg-a-fluo w-full text-2xl text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-a-fluo to-white hover:border hover:border-a-fluo">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default SwapCard;

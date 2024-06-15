import React from "react";
import Image from "next/image";

const SwapOutput = () => {
  return (
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
  );
};

export default SwapOutput;

import React from "react";
import Image from "next/image";
import { useSwapContext } from "@/context/Swap.context";

const SwapInput = () => {
  const { setIsTokenSelectorModalOpen } = useSwapContext();
  return (
    <section className="flex flex-col gap-3 ">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold">You are paying</span>

        <div className="text-[12px]">
          <span>Dextools</span>
        </div>
      </div>

      <div className="flex justify-between items-center rounded-xl bg-a-charcoal p-4">
        <button
          onClick={() => setIsTokenSelectorModalOpen(true)}
          className="font-bold "
        >
          <div className="rounded-xl border border-gray-500 bg-a-charcoal h-[50px] flex px-4 items-center gap-4">
            <Image
              alt="USDC"
              src="/assets/icons/usdclogo.png"
              width={28}
              height={28}
            />
            <span>USDC</span>
          </div>
        </button>
        <span>0.00</span>
      </div>
    </section>
  );
};

export default SwapInput;

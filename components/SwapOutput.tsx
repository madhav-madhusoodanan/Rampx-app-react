import React from "react";
import Image from "next/image";
import { useSwapContext } from "@/context/Swap.context";
import { Input } from "./ui/input";

const SwapOutput = () => {
  const { setIsTokenSelectorModalOpen } = useSwapContext();
  return (
    <section className="flex flex-col gap-3 pb-4 ">
      <div className="text-sm font-bold">To receive</div>

      <div className="flex justify-between items-center rounded-xl bg-a-charcoal p-4 focus-within:shadow-[0_0_6px_rgba(179,207,61,1)] transition-all duration-300">
        <button
          // onClick={() => setIsTokenSelectorModalOpen(true)}
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

        <Input
          type="number"
          placeholder="0.00"
          className="text-end font-semibold placeholder:text-gray-500 text-xl"
          onWheel={(e) => e.currentTarget.blur()}
        />
      </div>
    </section>
  );
};

export default SwapOutput;

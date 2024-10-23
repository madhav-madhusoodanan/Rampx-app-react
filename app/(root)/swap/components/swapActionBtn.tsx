import React from "react";

const SwapActionBtn = () => {
  return (
    <div className="flex justify-center mt-6">
      <button className="border-[0.5px] border-a-fluo/50 text-xl px-10 py-3 text-a-fluo hover:text-black hover:text-shadow-none shadow-[0_0_5px_rgba(179,207,61,1)] hover:shadow-[0_0_10px_rgba(179,207,61,1)] text-shadow-a-fluo text-opacity-30 transition-all duration-300 group relative font-medium">
        <span className="relative z-10">SWAP</span>
        <div className="absolute inset-0 bg-a-fluo z-0 w-0 group-hover:w-full transition-all duration-300" />
      </button>
    </div>
  );
};

export default SwapActionBtn;

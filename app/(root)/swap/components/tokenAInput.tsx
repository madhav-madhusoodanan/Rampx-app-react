import React from "react";
import SwapInput from "@/components/SwapInput";

const TokenAInput = () => {
  return (
    <div className="mt-4">
      <SwapInput tokenType="input" />
      <div className="flex justify-between items-center text-xs px-3 mt-2">
        <p className="text-a-gray">Available</p>
        <p className="text-white lining-nums">0.00 ETH</p>
      </div>
    </div>
  );
};

export default TokenAInput;

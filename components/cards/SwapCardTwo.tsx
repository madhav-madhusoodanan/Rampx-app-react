import React from "react";

const SwapCardTwo = () => {
  return (
    <div>
      <div className="swap-input-container mt-10 bg-gradient-to-r from-[#191919]/50 to-[#000000]/20  backdrop-blur-xl p-6  transition-all duration-300"></div>
      <div className="swap-input-container mt-2 bg-gradient-to-r from-[#191919]/50 to-[#000000]/20  backdrop-blur-xl p-6  transition-all duration-300  "></div>
      <button
        // onClick={getTokens}
        type="button"
        className="h-[55px] w-[450px] flex justify-center items-center rounded-xl bg-a-fluo  text-lg text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-a-fluo to-white hover:border  hover:border-a-fluo mt-4 font-medium"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default SwapCardTwo;

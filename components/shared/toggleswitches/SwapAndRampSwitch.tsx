import React, { Dispatch, SetStateAction } from "react";

interface Props {
  isSwap: boolean;
  setIsSwap: Dispatch<SetStateAction<boolean>>;
}

const SwapAndRampSwitch = ({ isSwap, setIsSwap }: Props) => {
  // TODO - Check to potentially remove fixed width and height className properties
  // TODO - Add mobile responsiveness
  return (
    <div
      className="flex justify-between items-center  bg-gradient-to-r from-white/25 to-[#999999]/0  rounded-full border-[1px] 
  border-white border-opacity-20 w-[330px] h-[65px] relative "
    >
      <button
        className={`w-[165px] h-[65px] flex items-center justify-center uppercase ${
          isSwap && "relative z-20 text-black transition-all duration-300"
        } `}
        onClick={() => setIsSwap(true)}
        disabled={isSwap}
      >
        swap
      </button>

      <button
        className={`w-[165px] h-[65px] flex items-center justify-center uppercase ${
          !isSwap && "relative z-20 text-black transition-all duration-300"
        } `}
        onClick={() => setIsSwap(false)}
        disabled={!isSwap}
      >
        on/off ramp
      </button>

      <div
        className={`absolute ${
          !isSwap && "translate-x-[165px] ease-in-out"
        } h-full w-[165px] bg-a-fluo rounded-full transition-all duration-300`}
      />
    </div>
  );
};

export default SwapAndRampSwitch;

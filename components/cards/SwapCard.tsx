"use client";
import React from "react";
import Image from "next/image";
import SwapInput from "../SwapInput";
import { useSwapContext } from "@/context/Swap.context";

import {
  testBlastTokens,
  getUserErc20Tokens,
} from "@/lib/actions/tokenData.action";

// import SwapOutput from "../SwapOutput";
// import {
//   Alchemy,
//   Network,
//   TokenBalanceType,
//   TokenBalancesResponse,
// } from "alchemy-sdk";
// import { getUserErc20TokensEth } from "@/lib/actions/tokenData.action";
// import { useSwapContext } from "@/context/Swap.context";
// import SwapTokenSelectorModal from "../modals/SwapTokenSelectorModal";

// TODO - Add mobile responsiveness
// TODO - Replace hardcoded data with dynamic data
// TODO - Add various UI edits for selecting currencies and other features
const SwapCard = () => {
  const { handleSwitchTokens } = useSwapContext();

  // const testy = async () => {
  //   console.log("lfg");
  //   const res = await testBlastTokens(
  //     "0xA346654d8C0f9d256e5b00aaa1Fd89582D5D75ae"
  //     // "0x48caade36c64a1e91715328b1cdebee3057c360c"
  //   );
  //   const res2 = await getUserErc20Tokens(
  //     {
  //       address: "0x48caade36c64a1e91715328b1cdebee3057c360c" as
  //         | `0x${string}`
  //         | undefined,
  //       chainId: 1,
  //     }
  //     // "0x48caade36c64a1e91715328b1cdebee3057c360c"
  //   );
  //   console.log("BLAST TOKENS", res);
  //   console.log(" TOKENS", res2);
  // };

  return (
    <div
      // onClick={testy}
      className=" bg-gradient-to-r from-[#191919]/50 to-[#000000]/20 rounded-2xl border-[1px] 
    border-gray-500 border-opacity-20 backdrop-blur-xl p-6"
    >
      <SwapInput tokenType="input" />

      {/* Divisor */}
      <div className="flex items-center  my-2">
        <div className="w-full h-[0.5px] opacity-80 bg-gradient-to-r from-a-fluo to-white " />
        <button onClick={handleSwitchTokens} type="button" className="w-[70px]">
          <Image
            alt="Exchange"
            src="/assets/icons/exchangearrows.svg"
            width={0}
            height={0}
            className="cursor-pointer hover:shadow-[0_0_6px_rgba(179,207,61,1)] rounded-full transition-all duration-300 w-full h-full"
          />
        </button>
        {/* <Image
          alt="Exchange"
          src="/assets/icons/exchangearrows.svg"
          width={32}
          height={32}
          className="cursor-pointer hover:shadow-[0_0_6px_rgba(179,207,61,1)] rounded-full transition-all duration-300"
        /> */}
        <div className="w-full h-[0.5px] opacity-80 bg-gradient-to-l from-a-fluo to-white " />
      </div>

      {/* <SwapOutput /> */}
      <SwapInput tokenType="output" />

      <button
        // onClick={getTokens}
        type="button"
        className="h-[55px] flex justify-center items-center rounded-xl bg-a-fluo w-full text-lg text-black hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-a-fluo to-white hover:border  hover:border-a-fluo mt-4 font-medium "
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default SwapCard;

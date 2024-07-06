"use client";
import React from "react";
import Image from "next/image";
import { shortenTokenSymbol } from "@/lib/utils";
import { useSwapContext } from "@/context/Swap.context";

interface Props {
  token: string;
  isMyToken?: boolean;
}

const TokenCard = ({ token, isMyToken }: Props) => {
  const {
    isTokenSelectorModalOpen,
    setIsTokenSelectorModalOpen,
    setInputToken,
    setOutputToken,
  } = useSwapContext();
  const parsedTokenData = JSON.parse(token);

  const handleSelectToken = () => {
    if (isTokenSelectorModalOpen === "input") {
      setInputToken({
        smartContractAddress: parsedTokenData.contractAddress,
        tokenName: parsedTokenData.tokenName,
        tokenSymbol: parsedTokenData.tokenSymbol,
        tokenLogo: parsedTokenData.tokenLogo ? parsedTokenData.tokenLogo : "",
      });
      setIsTokenSelectorModalOpen("");
    } else {
      setOutputToken({
        smartContractAddress: parsedTokenData.contractAddress,
        tokenName: parsedTokenData.tokenName,
        tokenSymbol: parsedTokenData.tokenSymbol,
        tokenLogo: parsedTokenData.tokenLogo ? parsedTokenData.tokenLogo : "",
      });
      setIsTokenSelectorModalOpen("");
    }
  };

  return (
    <button
      type="button"
      onClick={handleSelectToken}
      className={`bg-gray-300 bg-opacity-0 hover:bg-opacity-10 transition-all duration-150 cursor-pointer py-2 px-6 w-full ${
        isMyToken && "flex items-center justify-between"
      }`}
    >
      <div className="flex items-center gap-6">
        {parsedTokenData.tokenLogo ? (
          <Image
            src={parsedTokenData.tokenLogo}
            alt="popular-token"
            width={36}
            height={36}
            unoptimized
            className="rounded-full bg-white"
          />
        ) : (
          <div className="h-[36px] w-[36px] rounded-full  bg-[#052105] flex justify-center items-center ">
            <span className="text-xs text-a-fluo font-extrabold text-opacity-50">
              {shortenTokenSymbol(parsedTokenData.tokenSymbol)}
            </span>
          </div>
        )}

        <div className="flex flex-col text-start gap-0.5">
          <span className="text-sm w-[150px] truncate">
            {parsedTokenData.tokenName}
          </span>
          <span className="text-[12px] text-a-gray w-[80px] truncate">
            {parsedTokenData.tokenSymbol}
          </span>
        </div>
      </div>
      {isMyToken && (
        <div className="text-xs font-mono">
          {Number(parsedTokenData.tokenBalance).toFixed(2)}
        </div>
      )}
    </button>
  );
};

export default TokenCard;

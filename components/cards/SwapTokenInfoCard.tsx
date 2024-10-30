"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import TokenMiniChart from "../charts/TokenMiniChart";
import {
  checkNativeAddress,
  formatNumberToKMB,
  getTimestamps,
  shortenAddress,
} from "@/lib/utils";
import {
  useGetPriceMetaData,
  useGetPriceRangeData,
} from "@/hooks/useGraphQLQueries";
import { useChainId } from "wagmi";

interface Props {
  tokenLogo: string;
  tokenName: string;
  tokenSymbol: string;
  tokenSmartContractAddress: `0x${string}`;
}

const SwapTokenInfoCard = ({
  tokenLogo,
  tokenName,
  tokenSymbol,
  tokenSmartContractAddress,
}: Props) => {
  const chainId = useChainId();
  const { toTimestamp, fromTimestamp } = getTimestamps();
  const { data: chartData } = useGetPriceRangeData(
    ["chartData", tokenSmartContractAddress],
    tokenSmartContractAddress,
    chainId,
    fromTimestamp,
    toTimestamp
  );
  const { data: tokenMetaData } = useGetPriceMetaData(
    ["tokenPriceMetaData", tokenSmartContractAddress],
    tokenSmartContractAddress,
    chainId
  );

  const changeIn24H = useMemo(() => {
    if (tokenMetaData && tokenMetaData.length > 0) {
      const isPositive = tokenMetaData[0].change24 >= 0;
      const value = Number(tokenMetaData[0].change24).toFixed(2);
      return { isPositive, value };
    }

    return { isPositive: false, value: 0 };
  }, [tokenMetaData]);
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image
          src={tokenLogo}
          alt="input-token"
          width={28}
          height={28}
          className="rounded-full"
        />

        <div className="leading-tight">
          <div className="flex items-center gap-1">
            <p className="text-xl font-semibold">{tokenSymbol}</p>
            {!checkNativeAddress(tokenSmartContractAddress) && (
              <div className="px-1 bg-a-fluo lining-nums text-black flex justify-center items-center h-[16px] text-xs uppercase">
                {shortenAddress(tokenSmartContractAddress)}
              </div>
            )}
          </div>
          <p className="text-xs font-light">{tokenName}</p>
        </div>
      </div>

      <div className="flex items-center ">
        <div className="hidden sm:block ">
          <TokenMiniChart
            height={70}
            width={120}
            data={chartData ?? []}
            isPositive={changeIn24H.isPositive}
          />
        </div>

        <div className=" text-center flex flex-row sm:flex-col items-center justify-center gap-1 sm:gap-0">
          <p className={`text-lg lining-nums`}>
            {chartData && chartData.length > 0
              ? formatNumberToKMB(chartData[chartData.length - 1].price)
              : 0}
          </p>
          <p
            className={`${
              changeIn24H.isPositive ? "text-a-pnlGreen" : "text-a-pnlRed"
            } text-xs lining-nums`}
          >
            ({changeIn24H.value}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwapTokenInfoCard;

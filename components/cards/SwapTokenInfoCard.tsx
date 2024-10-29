"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import TokenMiniChart from "../charts/TokenMiniChart";
import { checkNativeAddress, getTimestamps, shortenAddress } from "@/lib/utils";
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
  const [chartData, setChartData] = useState([]);

  const chainId = useChainId();
  const { toTimestamp, fromTimestamp } = getTimestamps();
  const { data } = useGetPriceRangeData(
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
  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);

  const changeIn24H = useMemo(() => {
    if (tokenMetaData && tokenMetaData.length > 0) {
      const isPositive = tokenMetaData[0].change24 >= 0;
      const value = Number(tokenMetaData[0].change24).toFixed(2);
      return { isPositive, value };
    }

    return { isPositive: false, value: 0 };
  }, [tokenMetaData]);

  return (
    <div className="">
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
          <TokenMiniChart
            height={50}
            width={120}
            data={chartData}
            isPositive={changeIn24H.isPositive}
          />

          <p
            className={`${
              changeIn24H.isPositive ? "text-a-pnlGreen" : "text-a-pnlRed"
            } text-xs lining-nums`}
          >
            {changeIn24H.value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwapTokenInfoCard;

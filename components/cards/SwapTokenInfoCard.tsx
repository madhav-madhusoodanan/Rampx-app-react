import React from "react";
import Image from "next/image";
import { MOCK_TOKEN_EXPLORE_PAGE_STATS } from "@/constants";
import TokenMiniChart from "../charts/TokenMiniChart";
import { shortenAddress } from "@/lib/utils";

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
              <div className="px-1 bg-a-fluo lining-nums text-black flex justify-center items-center h-[16px] text-xs uppercase">
                {shortenAddress(tokenSmartContractAddress)}
              </div>
            </div>
            <p className="text-xs font-light">{tokenName}</p>
          </div>
        </div>

        <div className="flex items-center ">
          <TokenMiniChart
            height={50}
            width={120}
            data={MOCK_TOKEN_EXPLORE_PAGE_STATS[0].chartData}
            isPositive={MOCK_TOKEN_EXPLORE_PAGE_STATS[0].dayPnl.isPositive}
          />
          <p className="text-a-pnlGreen text-xs lining-nums">+2,34%</p>
        </div>
      </div>
    </div>
  );
};

export default SwapTokenInfoCard;

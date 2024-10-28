"use client";
import React, { useState } from "react";
import ExploreBreadcrumb from "@/components/ExploreBreadcrumb";
import TokenChart from "@/components/charts/TokenChart";
import SwapWidget from "@/components/SwapWidget";
import { Button } from "@/components/ui/button";
import TokenMiniChart from "@/components/charts/TokenMiniChart";
import { fetchChartData } from "@/lib/actions/charts.action";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { MOCK_TOKEN_EXPLORE_PAGE_STATS } from "@/constants";
import { formatNumberWithCommas, cn, formatNumberToKMB } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Listeners from "@/components/listeners";
import { SwapTokenSelectorModalWrapper } from "@/components/modals/SwapTokenSelectorModal";
import { useChainId } from "wagmi";
import TransactionTable from "./components/transactionTables";
import TokenPoolTable from "./components/tokenPoolTable";
// TODO - add flex-row to the stats section
// TODO - add custom loading.tsx file for this page (it's using the parent one)
const chains = [
  {
    chainId: 1,
    name: "ethereum",
  },
];

const MOCK_NAME = "X";

const TIME_RANGES = [
  { label: "12H", value: 43200 },
  { label: "1D", value: 86400 },
  { label: "1W", value: 604800 },
  { label: "1M", value: 2592000 },
  { label: "3M", value: 7776000 },
];

const Page = ({ contractAddress, data, chain, tokenInfo }: any) => {
  const [chartData, setChartData] = useState(data.data.data);
  const [currentTable, setCurrentTable] = useState("Transactions");

  const [selectedRange, setSelectedRange] = useState("1D");

  const updateChartData = async (range: string) => {
    setSelectedRange(range);
    const selectedTimeRange =
      TIME_RANGES.find((r) => r.label === range)?.value || 86400;
    const endTime = Math.floor(Date.now() / 1000);
    const startTime = endTime - selectedTimeRange;

    try {
      const newData = await fetch(
        `/api/charts?chainId=${chain?.chainId}&contractAddress=${contractAddress}&startTime=${startTime}&endTime=${endTime}`
      );
      const data = await newData.json();
      setChartData(data.data.data);
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  };

  return (
    <div className="my-10">
      <ExploreBreadcrumb
        contractAddress={contractAddress}
        name={(tokenInfo.getTokenInfo?.symbol).toUpperCase() || MOCK_NAME}
      />

      <div className="flex justify-between items-start gap-4 ">
        <TokenChart data={chartData} tokenInfo={tokenInfo.getTokenInfo} />

        <div className="mt-10">
          <div className="flex flex-col gap-4 z-90">
            <SwapTokenSelectorModalWrapper />
          </div>
          <SwapWidget />
          <Listeners />
        </div>
      </div>
      {/* <div className="flex gap-2 mt-4 bg-[#191919] p-2 rounded-lg w-fit">
                {TIME_RANGES.map((range) => (
                    <button
                        key={range.label}
                        onClick={(e) => {
                            e.preventDefault();
                            updateChartData(range.label);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedRange === range.label
                            ? 'bg-[#232323] text-white'
                            : 'text-white/50 hover:text-white'
                            }`}
                    >
                        {range.label}
                    </button>
                ))}
            </div> */}
      <div className="mt-10 flex flex-col gap-6 ">
        <h2 className="text-[28px] font-semibold">Stats</h2>

        <div className="text-white lining-nums flex justify-between border-b border-white/5 pb-10">
          <div className="flex flex-col gap-1">
            <h3 className="text-white/50">TVL</h3>
            <p className="text-[28px]">$239.8M</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-white/50">Market cap</h3>
            <p className="text-[28px]">
              {(() => {
                const lastPrice = chartData[chartData.length - 1]?.price;
                const marketCap =
                  lastPrice * tokenInfo.getTokenInfo?.circulatingSupply;
                return isNaN(marketCap)
                  ? "$0"
                  : `${formatNumberToKMB(marketCap)}`;
              })()}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-white/50">FDV</h3>
            <p className="text-[28px]">
              {(() => {
                const lastPrice = chartData[chartData.length - 1]?.price;
                const totalSupply = tokenInfo.getTokenInfo?.totalSupply;
                const fdv = lastPrice * totalSupply;
                return isNaN(fdv) ? "$0" : `${formatNumberToKMB(fdv)}`;
              })()}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-white/50">1 day volume</h3>
            <p className="text-[28px]">$438.2M</p>
          </div>
        </div>
      </div>

      <div className="flex gap-0 pb-3 mt-10">
        <Button
          className={`transition-all duration-200 text-[28px] ${
            currentTable === "Transactions"
              ? "text-white hover:opacity-50"
              : "text-white/50 hover:text-white"
          }`}
          onClick={() => setCurrentTable("Transactions")}
        >
          Transactions
        </Button>

        <Button
          className={`transition-all duration-200 text-[28px] ${
            currentTable === "Pools"
              ? "text-white hover:opacity-50"
              : "text-white/50 hover:text-white"
          }`}
          onClick={() => setCurrentTable("Pools")}
        >
          Pools
        </Button>
      </div>

      <div className="explore-table-border-container flex justify-center items-center bg-fading-gradient relative">
        {/*
        FADED GRADIENT BORDER TOP + BOTTOM
        Increase/Decrease the opacity of the gradient to make it more/less visible 👇
        */}
        <div className="bg-[#191919] explore-table-container m-[1px] pb-6">
          {currentTable === "Transactions" && (
            <TransactionTable address={contractAddress} />
          )}
          {currentTable === "Pools" && (
            <TokenPoolTable address={contractAddress} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

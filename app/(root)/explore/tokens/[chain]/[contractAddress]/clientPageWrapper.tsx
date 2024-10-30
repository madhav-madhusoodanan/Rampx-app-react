"use client";
import React, { useMemo, useState } from "react";
import ExploreBreadcrumb from "@/components/ExploreBreadcrumb";
import TokenChart from "@/components/charts/TokenChart";
import SwapWidget from "@/components/SwapWidget";
import { Button } from "@/components/ui/button";
import { formatNumberToKMB } from "@/lib/utils";
import { useFetchTokenPrice, useGetTopPools } from "@/hooks/useGraphQLQueries";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionTable from "./components/transactionTables";
import TokenPoolTable from "./components/tokenPoolTable";
// TODO - add flex-row to the stats section
// TODO - add custom loading.tsx file for this page (it's using the parent one)
const MOCK_NAME = "X";

const Page = ({ contractAddress, chartData, tokenInfo, chain }: any) => {
  const { data: poolsData, isLoading: poolsDataLoading } = useGetTopPools(
    ["topPools", chain.toString()],
    chain
  );

  const { data: tokenPriceData, isLoading: priceLoading } = useFetchTokenPrice(
    contractAddress,
    chain
  );

  const [currentTable, setCurrentTable] = useState("Transactions");

  const dailyVolume = useMemo(() => {
    if (!poolsData) return undefined;
    return poolsData.reduce((acc: number, pool) => {
      return acc + parseFloat(pool.volumeUSD1);
    }, 0);
  }, [poolsData]);

  const marketCap = useMemo(() => {
    const lastPrice =
      chartData[0]?.price ?? (!priceLoading ? tokenPriceData : 0);
    const marketCap =
      lastPrice * (tokenInfo?.getTokenInfo?.circulatingSupply ?? 0);
    return marketCap;
  }, [chartData, tokenPriceData, priceLoading, tokenInfo]);

  const fdv = useMemo(() => {
    const lastPrice =
      chartData[0]?.price ?? (!priceLoading ? tokenPriceData : 0);
    const totalSupply = tokenInfo?.getTokenInfo?.totalSupply ?? 0;
    const fdv = lastPrice * totalSupply;
    return fdv;
  }, [chartData, tokenPriceData, priceLoading, tokenInfo]);

  const tokenPrice = useMemo(() => {
    const lastPrice =
      chartData[0]?.price ?? (!priceLoading ? tokenPriceData : 0);
    return lastPrice as number;
  }, [chartData, tokenPriceData, priceLoading]);

  return (
    <div className="my-10 ">
      <ExploreBreadcrumb
        contractAddress={contractAddress}
        name={tokenInfo?.getTokenInfo?.symbol?.toUpperCase() || ""}
      />

      <div className="grid grid-cols-12 pt-10 gap-2">
        <div className="col-span-12 lg:col-span-7 ">
          <TokenChart
            data={chartData}
            tokenInfo={tokenInfo?.getTokenInfo}
            tokenPrice={tokenPrice}
            priceLoading={priceLoading}
          />
        </div>
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center lg:items-end">
          <SwapWidget />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-6 ">
        <h2 className="text-[28px] font-semibold">Stats</h2>

        <div className="text-white lining-nums flex justify-between border-b border-white/5 pb-10">
          <div className="flex flex-col gap-1">
            <h3 className="text-white/50">Market cap</h3>
            <p className="text-[28px]">
              {marketCap ? (
                formatNumberToKMB(marketCap)
              ) : priceLoading ? (
                <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
              ) : (
                formatNumberToKMB(marketCap)
              )}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-white/50">FDV</h3>
            <p className="text-[28px]">
              {fdv ? (
                formatNumberToKMB(fdv)
              ) : priceLoading ? (
                <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
              ) : (
                formatNumberToKMB(fdv)
              )}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-white/50">1 day volume</h3>
            <p className="text-[28px]">
              {poolsDataLoading ? (
                <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
              ) : dailyVolume ? (
                formatNumberToKMB(dailyVolume)
              ) : (
                ""
              )}
            </p>
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
        <div className="bg-[#191919] h-[400px] custom-scrollbar overflow-y-scroll explore-table-container m-[1px] pb-2">
          {currentTable === "Transactions" && (
            <TransactionTable
              address={contractAddress}
              tokenSymbol={
                tokenInfo?.getTokenInfo?.symbol?.toUpperCase() || "Token Amount"
              }
            />
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

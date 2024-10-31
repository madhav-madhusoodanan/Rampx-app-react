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
import TokenInfoTIle from "./components/tokenInfoTIle";
import { TokenInfo } from "@/types/tokens";
import { useDispatch } from "@/store";
import { prepareTokensSelectionForDirectBuySell } from "@/store/slices/swap";
import { useRouter } from "next/navigation";
// TODO - add flex-row to the stats section
// TODO - add custom loading.tsx file for this page (it's using the parent one)

const Page = ({ contractAddress, chartData, tokenInfo, chain }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
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
      lastPrice * (tokenInfo?.token?.info?.circulatingSupply ?? 0);
    return marketCap;
  }, [chartData, tokenPriceData, priceLoading, tokenInfo]);

  const fdv = useMemo(() => {
    const lastPrice =
      chartData[0]?.price ?? (!priceLoading ? tokenPriceData : 0);
    const totalSupply = tokenInfo?.token?.info?.totalSupply ?? 0;
    const fdv = lastPrice * totalSupply;
    return fdv;
  }, [chartData, tokenPriceData, priceLoading, tokenInfo]);

  const tokenPrice = useMemo(() => {
    const lastPrice =
      chartData[0]?.price ?? (!priceLoading ? tokenPriceData : 0);
    return lastPrice as number;
  }, [chartData, tokenPriceData, priceLoading]);

  const redirectToSwap = (isBuy: boolean) => {
    if (tokenInfo?.token && tokenInfo?.token?.info) {
      const tokeninfoFormat: TokenInfo = {
        address: contractAddress,
        chainId: tokenInfo.token.networkId,
        decimals: tokenInfo.token.decimals,
        name: tokenInfo.token.name,
        symbol: tokenInfo.token.symbol,
        logoURI:
          tokenInfo.token.info?.imageLargeUrl ||
          tokenInfo.token.info?.imageThumbUrl ||
          tokenInfo.token.info?.imageSmallUrl,
      };
      dispatch(
        prepareTokensSelectionForDirectBuySell({
          isBuy,
          tokenInfo: tokeninfoFormat,
          chain,
        })
      );
      router.push("/swap");
    }
  };

  return (
    <div className="my-10 ">
      <ExploreBreadcrumb
        contractAddress={contractAddress}
        name={tokenInfo?.token?.symbol?.toUpperCase() || ""}
      />

      <div className="grid grid-cols-12 pt-10 gap-2">
        <div className="col-span-12 lg:col-span-7 ">
          <TokenChart
            data={chartData}
            tokenInfo={tokenInfo?.token}
            tokenPrice={tokenPrice}
            priceLoading={priceLoading}
          />
        </div>
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center lg:items-end">
          <div className="flex lg:hidden w-full items-center justify-evenly">
            <div
              onClick={() => redirectToSwap(true)}
              className="border border-a-green text-a-green bg-a-green/10 max-w-[200px] w-full text-center py-3 font-semibold text-xl cursor-pointer"
            >
              BUY
            </div>
            <div
              onClick={() => redirectToSwap(false)}
              className="border border-a-pnlRed text-a-pnlRed bg-a-pnlRed/10 max-w-[200px] w-full text-center py-3 font-semibold text-xl cursor-pointer"
            >
              SELL
            </div>
          </div>
          <SwapWidget className="hidden lg:block" />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-6 ">
        <h2 className="text-[28px] font-semibold">Stats</h2>

        <div className="text-white lining-nums flex flex-col sm:flex-row gap-3 justify-between border-b border-white/5 pb-10">
          <TokenInfoTIle
            title="Market cap"
            content={
              marketCap ? (
                formatNumberToKMB(marketCap)
              ) : priceLoading ? (
                <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
              ) : (
                formatNumberToKMB(marketCap)
              )
            }
          />
          <TokenInfoTIle
            title="FDV"
            content={
              fdv ? (
                formatNumberToKMB(fdv)
              ) : priceLoading ? (
                <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
              ) : (
                formatNumberToKMB(fdv)
              )
            }
          />
          <TokenInfoTIle
            title="1 day volume"
            content={
              poolsDataLoading ? (
                <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
              ) : dailyVolume ? (
                formatNumberToKMB(dailyVolume)
              ) : (
                ""
              )
            }
          />
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
                tokenInfo?.token?.symbol?.toUpperCase() || "Token Amount"
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

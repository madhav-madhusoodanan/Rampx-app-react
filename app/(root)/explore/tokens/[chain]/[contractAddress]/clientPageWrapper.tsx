"use client";
import React, { useMemo, useState } from "react";
import ExploreBreadcrumb from "@/components/ExploreBreadcrumb";
import TokenChart from "@/components/charts/TokenChart";
import SwapWidget from "@/components/SwapWidget";
import { Button } from "@/components/ui/button";
import TokenMiniChart from "@/components/charts/TokenMiniChart";
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
import { useFetchTokenPrice } from "@/hooks/useGraphQLQueries";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionTable from "./components/transactionTables";
import TokenPoolTable from "./components/tokenPoolTable";
// TODO - add flex-row to the stats section
// TODO - add custom loading.tsx file for this page (it's using the parent one)
const MOCK_NAME = "X";

const Page = ({ contractAddress, chartData, tokenInfo, chain }: any) => {
    const { data: tokenPriceData, isLoading: priceLoading } = useFetchTokenPrice(
        contractAddress,
        chain
    );

    const [currentTable, setCurrentTable] = useState("Transactions");

    const marketCap = useMemo(() => {
        const lastPrice =
            chartData[chartData.length - 1]?.price ??
            (!priceLoading ? tokenPriceData : 0);
        const marketCap = lastPrice * tokenInfo.getTokenInfo?.circulatingSupply;
        return marketCap;
    }, [chartData, tokenPriceData, priceLoading, tokenInfo]);

    const fdv = useMemo(() => {
        const lastPrice =
            chartData[chartData.length - 1]?.price ??
            (!priceLoading ? tokenPriceData : 0);
        const totalSupply = tokenInfo.getTokenInfo?.totalSupply;
        const fdv = lastPrice * totalSupply;
        return fdv;
    }, [chartData, tokenPriceData, priceLoading, tokenInfo]);

    const tokenPrice = useMemo(() => {
        const lastPrice =
            chartData[chartData.length - 1]?.price ??
            (!priceLoading ? tokenPriceData : 0);
        return lastPrice as number;
    }, [chartData, tokenPriceData, priceLoading]);

    return (
        <div className="my-10">
            <ExploreBreadcrumb
                contractAddress={contractAddress}
                name={(tokenInfo.getTokenInfo?.symbol).toUpperCase() || MOCK_NAME}
            />

            <div className="flex justify-between items-start gap-4 ">
                <TokenChart
                    data={chartData}
                    tokenInfo={tokenInfo.getTokenInfo}
                    tokenPrice={tokenPrice}
                    priceLoading={priceLoading}
                />
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
                        <p className="text-[28px]">$438.2M</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-0 pb-3 mt-10">
                <Button
                    className={`transition-all duration-200 text-[28px] ${currentTable === "Transactions"
                        ? "text-white hover:opacity-50"
                        : "text-white/50 hover:text-white"
                        }`}
                    onClick={() => setCurrentTable("Transactions")}
                >
                    Transactions
                </Button>

                <Button
                    className={`transition-all duration-200 text-[28px] ${currentTable === "Pools"
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
                <div className="bg-[#191919] h-[400px] custom-scrollbar overflow-y-scroll explore-table-container m-[1px] pb-6">
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
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import ExploreTokenChart from "@/components/charts/ExploreTokenChart";
import TvlChart from "@/components/charts/TvlChart";
import VolumeChart from "@/components/charts/VolumeChart";
import Link from "next/link";

import Image from "next/image";
import { MOCK_TOKEN_EXPLORE_PAGE_STATS } from "@/constants";
import { formatNumberWithCommas } from "@/lib/utils";

import TokenMiniChart from "@/components/charts/TokenMiniChart";

import { cn } from "@/lib/utils";
import { CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
// import ExploreTvlChart from "@/components/charts/lightweight-charts/ExploreTvlChart";
// import ExploreVolumeChart from "@/components/charts/lightweight-charts/ExploreVolumeChart";

// TODO - Figure out the sticky scroll for table header
// TODO - Add truncate to fields that need it
// TODO - Check final chart components to remove the unused ones
// TODO - Remove unused libraries
// TODO - CHECK WHY LAST TOKENCARD IN TABLE DOES NOT HAVE HOVER EFFECT
// TODO - Replace the Link href with the correct path
// TODO - Check left border flickering on resize and disapearing on certain screen sizes

const Page = () => {
  return (
    <div className="my-10">
      <div className="flex justiyfy-between gap-10 ">
        {/* <ExploreTokenChart /> */}
        <div className="w-full">
          {" "}
          <TvlChart />
        </div>

        <div className="w-full">
          <VolumeChart />
        </div>
      </div>
      <div className=" w-full mt-20">
        <div className="flex gap-0 pb-3">
          <Button className=" transition-all duration-200 text-[28px] text-white">
            Tokens
          </Button>
          <Button className="hover:opacity-100 opacity-50 transition-all duration-200 text-[28px] text-white/50">
            Pools
          </Button>
          <Button className="hover:opacity-100 opacity-50 transition-all duration-200 text-[28px] text-white/50">
            Transactions
          </Button>
        </div>
        <div className="explore-table-border-container flex justify-center items-center bg-a-fluo relative">
          {/* 
        FADED GRADIENT BORDER TOP + BOTTOM 
        Increase/Decrease the opacity of the gradient to make it more/less visible 👇
        */}
          <div className="h-[2px] w-full absolute top-0 bg-gradient-to-r from-[#232323]/50 via-[#232323] to-[#232323]/50" />
          <div className="h-[2px] w-full absolute bottom-0 bg-gradient-to-r from-[#232323]/50 via-[#232323] to-[#232323]/50" />

          <div className="bg-[#191919] explore-table-container my-[1px] pb-6">
            <Table className="text-base lining-nums ">
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader>
                <TableRow className="bg-[#232418]/50 text-white/50 text-opacity-50 border-b border-white/10 h-[60px]">
                  <TableHead className="w-[20px] ">#</TableHead>
                  <TableHead>Token name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">1 hour</TableHead>
                  <TableHead className="text-right">1 day</TableHead>
                  <TableHead className="text-right">FDV</TableHead>
                  <TableHead className="text-right">Volume</TableHead>
                  <TableHead>
                    {/* NEED TO LEAVE EMPTY TO TAKE UP SPACE IN HEADER FOR MINI CHARTS */}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_TOKEN_EXPLORE_PAGE_STATS.map((item, index) => (
                  <TableRow
                    key={item.tokenName}
                    className="hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <TableCell className="font-medium my-auto">
                      <Link
                        href={`/explore/tokens/ethereum/${item.contractAddress}`}
                      >
                        {index + 1}
                      </Link>
                    </TableCell>
                    <TableCell className="">
                      <Link
                        href={`/explore/tokens/ethereum/${item.contractAddress}`}
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={item.tokenLogo}
                            alt={item.tokenName}
                            width={28}
                            height={28}
                            className=""
                          />
                          {item.tokenName}
                          <span className="text-gray-500">
                            {item.tokenSymbol}
                          </span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/explore/tokens/ethereum/${item.contractAddress}`}
                      >
                        ${formatNumberWithCommas(item.price)}
                      </Link>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right",
                        item.hourPnl.isPositive
                          ? "text-a-pnlGreen"
                          : "text-a-pnlRed"
                      )}
                    >
                      <Link
                        href={`/explore/tokens/ethereum/${item.contractAddress}`}
                      >
                        <div className=" flex justify-end items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            width="16"
                            height="16"
                            className={cn(
                              "h-4 w-4",
                              !item.hourPnl.isPositive && "rotate-180"
                            )}
                          >
                            <path
                              d="M13.3021 7.7547L17.6821 14.2475C18.4182 15.3388 17.7942 17 16.6482 17L7.3518 17C6.2058 17 5.5818 15.3376 6.3179 14.2475L10.6979 7.7547C11.377 6.7484 12.623 6.7484 13.3021 7.7547Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          {item.hourPnl.value}%
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right",
                        item.dayPnl.isPositive
                          ? "text-a-pnlGreen"
                          : "text-a-pnlRed"
                      )}
                    >
                      <Link
                        href={`/explore/tokens/ethereum/${item.contractAddress}`}
                      >
                        <div className=" flex justify-end items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            width="16"
                            height="16"
                            className={cn(
                              "h-4 w-4",
                              !item.dayPnl.isPositive && "rotate-180"
                            )}
                          >
                            <path
                              d="M13.3021 7.7547L17.6821 14.2475C18.4182 15.3388 17.7942 17 16.6482 17L7.3518 17C6.2058 17 5.5818 15.3376 6.3179 14.2475L10.6979 7.7547C11.377 6.7484 12.623 6.7484 13.3021 7.7547Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          {item.dayPnl.value}%
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/explore/tokens/ethereum/${item.contractAddress}`}
                      >
                        ${item.fdv}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/explore/tokens/ethereum/${item.contractAddress}`}
                      >
                        ${item.volume}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right w-[150px] h-[60px] p-0">
                      <Link
                        href={`/explore/tokens/ethereum/${item.contractAddress}`}
                      >
                        <TokenMiniChart
                          height={60}
                          width={150}
                          data={item.chartData}
                          isPositive={
                            item.hourPnl.isPositive || item.dayPnl.isPositive
                          }
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

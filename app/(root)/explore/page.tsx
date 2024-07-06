import React from "react";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import {
  MOCK_CHART_DATA,
  MOCK_POPULAR_TOKENS,
  MOCK_TOKEN_EXPLORE_PAGE_STATS,
} from "@/constants";
import { formatNumberWithCommas } from "@/lib/utils";

import TokenMiniChart from "@/components/charts/TokenMiniChart";
import ExploreMainChart from "@/components/charts/ExploreMainChart";

// TODO - Figure out the sticky scroll for table header
// TODO - Add truncate to fields that need it
// TODO - Check syne numbers issue with font

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

const Page = () => {
  return (
    <div>
      <div className="mt-20">
        <ExploreMainChart data={initialData} />
      </div>
      <div className=" w-full mt-10">
        <div className="flex gap-0 pb-3">
          <Button className=" transition-all duration-200 text-[28px] text-a-fluo">
            Tokens
          </Button>
          <Button className="hover:opacity-100 opacity-50 transition-all duration-200 text-[28px] text-a-fluo">
            Pools
          </Button>
          <Button className="hover:opacity-100 opacity-50 transition-all duration-200 text-[28px] text-a-fluo">
            Transactions
          </Button>
        </div>
        <Table className="text-base lining-nums">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className="">
            <TableRow className="bg-[#232418]/50 text-a-fluo text-opacity-50 border-b border-white/10 h-[60px]">
              <TableHead className="w-[20px] ">#</TableHead>
              <TableHead>Token name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">1 hour</TableHead>
              <TableHead className="text-right">1 day</TableHead>
              <TableHead className="text-right">FDV</TableHead>
              <TableHead className="text-right">Volume</TableHead>
              <TableHead className="">
                {/* NEED TO LEAVE EMPTY TO TAKE UP SPACE IN HEADER */}
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
                  {index + 1}
                </TableCell>
                <TableCell className="">
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.tokenLogo}
                      alt={item.tokenName}
                      width={28}
                      height={28}
                      className=""
                    />
                    {item.tokenName}
                    <span className="text-gray-500">{item.tokenSymbol}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  ${formatNumberWithCommas(item.price)}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    item.hourPnl.isPositive
                      ? "text-a-pnlGreen"
                      : "text-a-pnlRed"
                  }`}
                >
                  <div className=" flex justify-end items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      width="16"
                      height="16"
                      className={`h-4 w-4 ${
                        !item.hourPnl.isPositive && "rotate-180"
                      }`}
                    >
                      <path
                        d="M13.3021 7.7547L17.6821 14.2475C18.4182 15.3388 17.7942 17 16.6482 17L7.3518 17C6.2058 17 5.5818 15.3376 6.3179 14.2475L10.6979 7.7547C11.377 6.7484 12.623 6.7484 13.3021 7.7547Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    {item.hourPnl.value}%
                  </div>
                </TableCell>
                <TableCell
                  className={`text-right ${
                    item.dayPnl.isPositive ? "text-a-pnlGreen" : "text-a-pnlRed"
                  }`}
                >
                  <div className=" flex justify-end items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      width="16"
                      height="16"
                      className={`h-4 w-4 ${
                        !item.dayPnl.isPositive && "rotate-180"
                      }`}
                    >
                      <path
                        d="M13.3021 7.7547L17.6821 14.2475C18.4182 15.3388 17.7942 17 16.6482 17L7.3518 17C6.2058 17 5.5818 15.3376 6.3179 14.2475L10.6979 7.7547C11.377 6.7484 12.623 6.7484 13.3021 7.7547Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    {item.dayPnl.value}%
                  </div>
                </TableCell>
                <TableCell className="text-right">${item.fdv}</TableCell>
                <TableCell className="text-right">${item.volume}</TableCell>
                <TableCell className="text-right w-[150px] h-[60px] p-0">
                  <TokenMiniChart
                    data={item.chartData}
                    isPositive={
                      item.hourPnl.isPositive || item.dayPnl.isPositive
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;

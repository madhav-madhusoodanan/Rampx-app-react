"use client";
import { useState } from "react";

import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { MOCK_TOKEN_EXPLORE_PAGE_STATS } from "@/constants";
import { CgWebsite } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import BlockExplorerIcon from "../custom-icons/BlockExplorerIcon";
import Image from "next/image";
import Link from "next/link";

import {
  //   Card,
  //   CardDescription,
  //   CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/custom-charts/explore-token-chart";

const monthAbbreviations = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "white",
  },
} satisfies ChartConfig;

const TokenChart = ({ data }: { data: any[] }) => {
  const [mouseEnteredChart, setMouseEnteredChart] = useState<boolean>(false);

  // Transform the API data into the format needed for the chart
  const transformedChartData = data
    .map((item) => ({
      time: item.updated_at,
      value: item.price,
    }))
    .reverse(); // Reverse to show oldest to newest

  const tickFormatter = (value: string) => {
    const date = new Date(value);
    const month = monthAbbreviations[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    return `${month} ${year}`;
  };

  // Format the current price for display
  const formatPrice = (price: number) => {
    if (price < 0.00001) {
      return price.toFixed(10);
    }
    return price.toFixed(6);
  };

  return (
    <div className="mt-4 w-[60%]">
      {/* <div className="pt-4 flex items-center gap-3 uppercase font-medium text-2xl">
        <Image
          src={MOCK_TOKEN_EXPLORE_PAGE_STATS[0].tokenLogo}
          alt={MOCK_TOKEN_EXPLORE_PAGE_STATS[0].tokenSymbol}
          width={32}
          height={32}
          className=""
        />

        <p className="text-white">
          {" "}
          {MOCK_TOKEN_EXPLORE_PAGE_STATS[0].tokenName}
        </p>
        <p className="text-a-gray">
          {MOCK_TOKEN_EXPLORE_PAGE_STATS[0].tokenSymbol}
        </p>
      </div> */}
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 uppercase font-medium text-a-gray text-2xl">
            <Image
              src={MOCK_TOKEN_EXPLORE_PAGE_STATS[0].tokenLogo}
              alt={MOCK_TOKEN_EXPLORE_PAGE_STATS[0].tokenSymbol}
              width={32}
              height={32}
              className=""
            />

            <p className="text-white">
              {" "}
              {MOCK_TOKEN_EXPLORE_PAGE_STATS[0].tokenName}
            </p>
            <p className="text-a-gray">
              {MOCK_TOKEN_EXPLORE_PAGE_STATS[0].tokenSymbol}
            </p>
          </div>
          <div className="flex items-center gap-2 pr-6">
            <Link
              href="https://etherscan.io"
              target="_blank"
              className="hover:bg-a-fluo hover:bg-opacity-15 transition-all duration-150 flex justify-center items-center h-9 w-9 rounded-xl text-a-gray hover:text-white"
            >
              <BlockExplorerIcon className="w-6 h-6 " />
            </Link>
            <Link
              href="https://etherscan.io"
              target="_blank"
              className="hover:bg-a-fluo hover:bg-opacity-15 transition-all duration-150 flex justify-center items-center h-9 w-9 rounded-xl text-a-gray hover:text-white"
            >
              <CgWebsite className="w-5 h-5 " />
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              className="hover:bg-a-fluo hover:bg-opacity-15 transition-all duration-150 flex justify-center items-center h-9 w-9 rounded-xl text-a-gray hover:text-white"
            >
              <FaXTwitter className="w-5 h-5 " />
            </Link>
          </div>
        </div>
        <CardTitle className="font-semibold text-white text-[36px] lining-nums h-[54px]">
          {!mouseEnteredChart &&
            `$${formatPrice(
              transformedChartData[transformedChartData.length - 1].value
            )}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          onMouseLeave={() => setMouseEnteredChart(false)}
        >
          <AreaChart
            accessibilityLayer
            data={transformedChartData}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setMouseEnteredChart(true);
              } else {
                setMouseEnteredChart(false);
              }
            }}
            // margin={{
            //   left: 12,
            //   right: 12,
            // }}
          >
            <XAxis
              style={{
                // fontSize: "0.8rem",
                // fontFamily: "Arial",
                fill: "rgba(124, 124, 124)",
                // @ts-ignore it works just fine despite it saying property does not exist
                fontVariantNumeric: "lining-nums",
              }}
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={30}
              tickFormatter={tickFormatter}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis
              style={{
                // fontSize: "0.8rem",
                // fontFamily: "Arial",
                fill: "rgba(124, 124, 124)",
                // @ts-ignore it works just fine despite it saying property does not exist
                fontVariantNumeric: "lining-nums",
              }}
              dataKey="value"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              //   minTickGap={10}
              //   tickFormatter={tickFormatter}
              orientation="right"
              //   tickFormatter={(value) => value.slice(0, 3)}
            />

            {/* <CartesianGrid
              strokeDasharray="3 3"
              //   fill="#FFFFFF"
              stroke="#FFFFFF"
              // vertical={false}
            /> */}

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  className="bg-a-charcoal"
                />
              }
            />
            <Area
              dataKey="value"
              type="natural"
              fill="#D0F603"
              fillOpacity={0.05}
              stroke="#D0F603"
              strokeWidth={1}
            />
            {/* <Legend
              content={<RenderLegend   />}
              verticalAlign="top"
            /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </div>
  );
};
export default TokenChart;

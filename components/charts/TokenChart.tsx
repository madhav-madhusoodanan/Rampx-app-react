"use client";
import { useState, useEffect } from "react";

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

import { Skeleton } from "@/components/ui/skeleton";

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

const TokenChart = ({
  data,
  tokenInfo,
  tokenPrice,
  priceLoading,
}: {
  data: any[];
  tokenInfo: any;
  tokenPrice: number;
  priceLoading: boolean;
}) => {
  const [mouseEnteredChart, setMouseEnteredChart] = useState<boolean>(false);
  const [dominantColor, setDominantColor] = useState<string>("#D0F603");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const extractColor = async () => {
      setIsLoading(true);
      try {
        // Use the proxy URL
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(
          tokenInfo.imageLargeUrl
        )}`;

        // Create image element directly
        const img = document.createElement("img");
        img.crossOrigin = "anonymous";

        // Create a promise to handle the image loading
        const imageLoadPromise = new Promise((resolve, reject) => {
          img.onload = () => {
            console.log("Image loaded successfully");
            resolve(img);
          };

          img.onerror = (e) => {
            console.error("Error loading image:", e);
            reject(e);
          };
        });

        // Set the source to use our proxy
        img.src = proxyUrl;

        // Wait for image to load
        await imageLoadPromise;

        // Process the image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Could not get canvas context");
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;

        let r = 0,
          g = 0,
          b = 0;
        let count = 0;

        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
          count++;
        }

        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        const color = `rgb(${r}, ${g}, ${b})`;
        console.log("Extracted color:", color);
        setDominantColor(color);
      } catch (error) {
        console.error("Error in color extraction:", error);
        setDominantColor("#D0F603");
      } finally {
        setIsLoading(false);
      }
    };

    extractColor();
  }, [tokenInfo.imageLargeUrl]);

  if (isLoading) {
    return (
      <div className="w-full h-[304px] mt-12 pb-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            className="animate-pulse bg-slate-50/10 w-full"
            d="M0 50 Q 25 0, 50 50 T 100 50 T 150 50 T 200 50"
            stroke="rgba(248, 250, 252, 0.2)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div className="flex items-center gap-10 pt-14">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-[8px] w-[50px] rounded-[10px]" />
          ))}
        </div>
      </div>
    );
  }

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
              src={tokenInfo.imageLargeUrl}
              alt={tokenInfo.symbol}
              width={36}
              height={36}
              className="rounded-full"
            />

            <p className="text-white"> {tokenInfo.name}</p>
            <p className="text-a-gray">{tokenInfo.symbol}</p>
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
          {!mouseEnteredChart ? (
            tokenPrice ? (
              `$${formatPrice(tokenPrice ?? 0)}`
            ) : priceLoading ? (
              <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
            ) : (
              `$${formatPrice(tokenPrice ?? 0)}`
            )
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {transformedChartData.length > 0 && (
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
                fill={dominantColor}
                fillOpacity={0.05}
                stroke={dominantColor}
                strokeWidth={1}
              />
              {/* <Legend
              content={<RenderLegend   />}
              verticalAlign="top"
            /> */}
            </AreaChart>
          </ChartContainer>
        )}
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

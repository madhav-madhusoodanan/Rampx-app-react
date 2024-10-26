"use client";

import TokenMiniChart from "@/components/charts/TokenMiniChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTopTokens } from "@/hooks/useGraphQLQueries";
import { cn, formatDollarAmount, formatNumberWithCommas } from "@/lib/utils";
import { TopTokensResponse } from "@/types/tokens";
import Image from "next/image";
import Link from "next/link";
import { useChainId } from "wagmi";

const TopTokensTable = () => {
  const chainId = useChainId();
  const { data } = useGetTopTokens(["topTokens", chainId.toString()], chainId);
  console.log({ data });

  return (
    <Table className="text-base lining-nums">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow className="bg-[#232418]/50 text-white/50 text-opacity-50 border-b border-white/10 h-[60px]">
          <TableHead className="w-[20px] ">#</TableHead>
          <TableHead>Token name</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">1 hour</TableHead>
          <TableHead className="text-right">1 day</TableHead>
          <TableHead className="text-right">Liquidity</TableHead>
          <TableHead className="text-right">Volume</TableHead>
          <TableHead>
            {/* NEED TO LEAVE EMPTY TO TAKE UP SPACE IN HEADER FOR MINI CHARTS */}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item: TopTokensResponse, index: number) => (
          <TableRow
            key={item.name}
            className="hover:bg-white/10 transition-colors cursor-pointer"
          >
            <TableCell className="font-medium my-auto">
              <Link href={`/explore/tokens/ethereum/${item.address}`}>
                {index + 1}
              </Link>
            </TableCell>
            <TableCell className="">
              <Link href={`/explore/tokens/ethereum/${item.address}`}>
                <div className="flex items-center gap-2">
                  {item.imageThumbUrl ? (
                    <Image
                      src={item.imageThumbUrl}
                      alt={item.name}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  ) : null}
                  {item.name}
                  <span className="text-gray-500">{item.symbol}</span>
                </div>
              </Link>
            </TableCell>
            <TableCell
              className="text-right"
              title={`$${item.price?.toString()}`}
            >
              <Link href={`/explore/tokens/ethereum/${item.address}`}>
                ${formatNumberWithCommas(item.price?.toString())}
              </Link>
            </TableCell>
            <TableCell
              className={cn(
                "text-right",
                item.isPositiveHour ? "text-a-pnlGreen" : "text-a-pnlRed"
              )}
            >
              <Link href={`/explore/tokens/ethereum/${item.address}`}>
                <div className=" flex justify-end items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    width="16"
                    height="16"
                    className={cn(
                      "h-4 w-4",
                      !item.isPositiveHour && "rotate-180"
                    )}
                  >
                    <path
                      d="M13.3021 7.7547L17.6821 14.2475C18.4182 15.3388 17.7942 17 16.6482 17L7.3518 17C6.2058 17 5.5818 15.3376 6.3179 14.2475L10.6979 7.7547C11.377 6.7484 12.623 6.7484 13.3021 7.7547Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  {item.priceChange1.toFixed(2)}%
                </div>
              </Link>
            </TableCell>
            <TableCell
              className={cn(
                "text-right",
                item.isPositiveDay ? "text-a-pnlGreen" : "text-a-pnlRed"
              )}
            >
              <Link href={`/explore/tokens/ethereum/${item.address}`}>
                <div className=" flex justify-end items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    width="16"
                    height="16"
                    className={cn(
                      "h-4 w-4",
                      !item.isPositiveDay && "rotate-180"
                    )}
                  >
                    <path
                      d="M13.3021 7.7547L17.6821 14.2475C18.4182 15.3388 17.7942 17 16.6482 17L7.3518 17C6.2058 17 5.5818 15.3376 6.3179 14.2475L10.6979 7.7547C11.377 6.7484 12.623 6.7484 13.3021 7.7547Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  {item.priceChange24.toFixed(2)}%
                </div>
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <Link href={`/explore/tokens/ethereum/${item.address}`}>
                {formatDollarAmount(Number(item.liquidity))}
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <Link href={`/explore/tokens/ethereum/${item.address}`}>
                {formatDollarAmount(Number(item.volume))}
              </Link>
            </TableCell>
            <TableCell className="text-right w-[150px] h-[60px] p-0">
              <Link href={`/explore/tokens/ethereum/${item.address}`}>
                <TokenMiniChart
                  height={60}
                  width={150}
                  data={item.chartData}
                  isPositive={item.isPositiveHour || item.isPositiveDay}
                />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TopTokensTable;

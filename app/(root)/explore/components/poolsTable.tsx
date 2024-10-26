"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTopPools } from "@/hooks/useGraphQLQueries";
import { formatDollarAmount } from "@/lib/utils";
import { TopPools } from "@/types/tokens";
import Image from "next/image";
import Link from "next/link";
import { useChainId } from "wagmi";

const PoolsTable = () => {
  const chainId = useChainId();
  const { data } = useGetTopPools(["topPools", chainId.toString()], chainId);

  return (
    <Table className="text-base lining-nums ">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow className="bg-[#232418]/50 text-white/50 text-opacity-50 border-b border-white/10 h-[60px]">
          <TableHead className="w-[20px] ">#</TableHead>
          <TableHead>Pair name</TableHead>
          {/* <TableHead className="text-right">TVL</TableHead>
          <TableHead className="text-right">APR</TableHead> */}
          <TableHead className="text-right">Vol 1d</TableHead>
          <TableHead className="text-right">Vol 7d</TableHead>
          {/* <TableHead className="text-right">Exchange</TableHead> */}
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data?.length > 0 ? (
          <>
            {data?.map((item: TopPools, index: number) => (
              <TableRow
                key={index}
                className="hover:bg-white/10 transition-colors cursor-pointer"
              >
                <TableCell className="font-medium my-auto">
                  <Link href="">{index + 1}</Link>
                </TableCell>
                <TableCell className="">
                  <Link href="">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {item.token0.info.imageThumbUrl ? (
                          <Image
                            src={item.token0.info.imageThumbUrl}
                            alt={item.token0.name}
                            width={28}
                            height={28}
                            className="rounded-full"
                          />
                        ) : null}
                        {item.token1.info.imageThumbUrl ? (
                          <Image
                            src={item.token1.info.imageThumbUrl}
                            alt={item.token1.name}
                            width={28}
                            height={28}
                            className="rounded-full mr-[25px]"
                          />
                        ) : null}
                      </div>
                      {/* {item.token0.name}/{item.token1.name} */}
                      <span className="text-gray-500">
                        {item.token0.symbol}/{item.token1.symbol}
                      </span>
                    </div>
                  </Link>
                </TableCell>
                {/* <TableCell
              className="text-right"
              title={`$${item.price.toString()}`}
            >
              <Link href="">
                ${formatNumberWithCommas(item.price.toString())}
              </Link>
            </TableCell>
            <TableCell
              className={cn(
                "text-right",
                item.isPositiveHour ? "text-a-pnlGreen" : "text-a-pnlRed"
              )}
            >
              <Link href="">
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
            </TableCell>*/}
                {/* <TableCell className="text-right">
              <div className=" flex justify-end items-center gap-1">
                {item.priceChange24.toFixed(2)}%
              </div>
            </TableCell> */}
                <TableCell className="text-right">
                  <Link href="">
                    {formatDollarAmount(Number(item.volumeUSD1))}
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Link href="">
                    {formatDollarAmount(Number(item.volumeUSD24))}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          <TableRow className="font-semibold text-2xl text-a-fluo w-full">
            <TableCell colSpan={6} className="text-center">
              No Data Available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default PoolsTable;

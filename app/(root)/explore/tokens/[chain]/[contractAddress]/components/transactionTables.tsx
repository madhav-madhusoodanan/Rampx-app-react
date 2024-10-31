import { useGetTokensTxn } from "@/hooks/useGraphQLQueries";
import { useChainId } from "wagmi";
import TableLoading from "../../../../tableLoading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatNumberWithCommas,
  cn,
  shortenAddress,
  timeAgo,
} from "@/lib/utils";
import Link from "next/link";
import { chainExplorers } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SpinningLoader } from "@/components/loaders/Spinner";

const TransactionTable = ({
  address,
  tokenSymbol,
}: {
  address: string;
  tokenSymbol: string;
}) => {
  const [showButton, setShowButton] = useState(false);
  const scrollableRef = useRef<any>(null);

  const [cursor, setCursor] = useState<string | null>(null);
  const [txns, setTxns] = useState<any[]>([]);
  const chainId = useChainId();
  const { data, isLoading, isFetching, refetch } = useGetTokensTxn(
    ["tokenTxn", address, chainId.toString()],
    address,
    chainId,
    cursor
  );

  useEffect(() => {
    if (data) {
      setTxns([...txns, ...data.items]);
      setCursor(data.pageCursor);
    }
  }, [data]);

  const loadmore = () => {
    if (cursor) {
      refetch();
    }
  };

  // to show loadmore button when user scroll down to the table
  useEffect(() => {
    const handleScroll = () => {
      const element = scrollableRef.current;
      console.log({ element });
      if (element) {
        console.log({
          first: element.scrollHeight - element.scrollTop - 1,
          second: element.clientHeight + 60,
        });
        const isBottom =
          element.scrollHeight - element.scrollTop - 1 <=
          element.clientHeight + 50;
        console.log({ isBottom });
        setShowButton(isBottom);
      }
    };

    const scrollableElement = scrollableRef.current;
    scrollableElement?.addEventListener("scroll", handleScroll);

    return () => scrollableElement?.removeEventListener("scroll", handleScroll);
  }, [scrollableRef.current]);

  if (isLoading) {
    return <TableLoading />;
  }
  return (
    <div
      ref={scrollableRef}
      className="bg-[#191919] h-[450px] custom-scrollbar overflow-y-scroll explore-table-container m-[1px] pb-2"
    >
      <Table className="text-base lining-nums relative">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="bg-[#232418]/50 text-white/50 text-opacity-50 border-b border-white/10 h-[60px]">
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">USD</TableHead>
            <TableHead className="text-right">
              {chainId === 1329 ? "SEI" : "ETH"}
            </TableHead>
            <TableHead className="text-right">{tokenSymbol}</TableHead>
            <TableHead className="text-right">Maker</TableHead>
            <TableHead className="text-right">Txn Hash</TableHead>
            <TableHead>
              {/* NEED TO LEAVE EMPTY TO TAKE UP SPACE IN HEADER FOR MINI CHARTS */}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {txns.length > 0 ? (
            <>
              {txns.map((item: any, index: number) => (
                <TableRow
                  key={item.name}
                  className={`hover:bg-white/10 transition-colors cursor-pointer ${
                    item.eventDisplayType === "Sell"
                      ? "text-a-pnlGreen"
                      : "text-a-pnlRed"
                  }`}
                >
                  <TableCell className="">
                    <div className="flex items-center gap-2">
                      {timeAgo(item.timestamp)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right" title={item.data.priceUsd}>
                    ${Number(item.data.priceUsd ?? 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${formatNumberWithCommas(item.data.priceUsdTotal)}
                  </TableCell>
                  <TableCell className={cn("text-right")}>
                    <div className=" flex justify-end items-center gap-1">
                      {Number(item.data.priceBaseTokenTotal ?? 0).toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell className={cn("text-right")}>
                    <div className=" flex justify-end items-center gap-1">
                      {Number(item.data.amountNonLiquidityToken ?? 0).toFixed(
                        2
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={cn("text-right")}>
                    <Link
                      target="_blank"
                      href={
                        chainId !== 531
                          ? `${chainExplorers[chainId]}/address/${item.maker}`
                          : `${chainExplorers[531]}/accounts/${item.maker}`
                      }
                    >
                      <div className=" flex justify-end items-center gap-1">
                        {shortenAddress(item.maker)}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className={cn("text-right")}>
                    <Link
                      target="_blank"
                      href={
                        chainId !== 531
                          ? `${chainExplorers[chainId]}/tx/${item.transactionHash}`
                          : `${chainExplorers[531]}/tx/${item.transactionHash}`
                      }
                    >
                      <div className=" flex justify-end items-center gap-1">
                        {shortenAddress(item.transactionHash)}
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow className="font-semibold text-2xl text-a-fluo w-full">
              <TableCell colSpan={8} className="text-center">
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {txns.length > 0 && showButton && (
        <div className="absolute z-10 bottom-0 left-0 right-0 bg-[#191919] py-3 flex justify-center">
          <Button
            disabled={isFetching}
            onClick={loadmore}
            className="border border-a-fluo"
          >
            {isFetching ? (
              <SpinningLoader className="h-4 w-4 text-a-fluo" />
            ) : (
              "Load more"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
export default TransactionTable;

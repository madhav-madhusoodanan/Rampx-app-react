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

const TransactionTable = ({ address }: { address: string }) => {
  const chainId = useChainId();
  const { data, isLoading } = useGetTokensTxn(
    ["tokenTxn", address, chainId.toString()],
    address,
    chainId
  );

  if (isLoading) {
    return <TableLoading />;
  }
  return (
    <Table className="text-base lining-nums">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow className="bg-[#232418]/50 text-white/50 text-opacity-50 border-b border-white/10 h-[60px]">
          <TableHead className="w-[20px] ">#</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">Type</TableHead>
          <TableHead className="text-right">USD</TableHead>
          <TableHead className="text-right">Token Amount</TableHead>
          <TableHead className="text-right">Token Amount</TableHead>
          <TableHead className="text-right">Wallet</TableHead>
          <TableHead>
            {/* NEED TO LEAVE EMPTY TO TAKE UP SPACE IN HEADER FOR MINI CHARTS */}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data?.length > 0 ? (
          <>
            {data?.map((item: any, index: number) => (
              <TableRow
                key={item.name}
                className="hover:bg-white/10 transition-colors cursor-pointer"
              >
                <TableCell className="font-medium my-auto">
                  {index + 1}
                </TableCell>
                <TableCell className="">
                  <div className="flex items-center gap-2">
                    {timeAgo(item.timestamp)}
                  </div>
                </TableCell>
                <TableCell className="">
                  <div className="flex items-center gap-2">
                    {item.eventType}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  ${formatNumberWithCommas(item.token0SwapValueUsd)}
                </TableCell>
                <TableCell className={cn("text-right")}>
                  <div className=" flex justify-end items-center gap-1">
                    {Number(item.token0ValueBase ?? 0).toFixed(2)}
                  </div>
                </TableCell>
                <TableCell className={cn("text-right")}>
                  <div className=" flex justify-end items-center gap-1">
                    {Number(item.token1ValueBase ?? 0).toFixed(5)}
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
  );
};
export default TransactionTable;

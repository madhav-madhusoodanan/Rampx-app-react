import { useChainId } from "wagmi";
import { useGetTopPools } from "@/hooks/useGraphQLQueries";
import PoolsTable from "@/app/(root)/explore/components/poolsTable";

const TokenPoolTable = ({ address }: { address: string }) => {
  const chainId = useChainId();
  const { data } = useGetTopPools(
    ["tokenPool", chainId.toString()],
    chainId,
    address
  );
  return <PoolsTable data={data} />;
};

export default TokenPoolTable;

import { useChainId } from "wagmi";
import PoolsTable from "./poolsTable";
import { useGetTopPools } from "@/hooks/useGraphQLQueries";

const ChainPoolTable = () => {
  const chainId = useChainId();
  const { data } = useGetTopPools(["topPools", chainId.toString()], chainId);
  return <PoolsTable data={data} />;
};

export default ChainPoolTable;

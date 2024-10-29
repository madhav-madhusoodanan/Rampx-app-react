import {
  fetchPriceChartRange,
  fetchQuery,
  fetchTokenMetadata,
  fetchTokensTxn,
  fetchTopPools,
  fetchTopTokens,
} from "@/lib/actions/codex.action";
import { useQuery } from "@tanstack/react-query";

export const useFetchTokenPrice = (token: string, chain: number) => {
  return useQuery({
    queryKey: ["tokenPrice"],
    queryFn: () =>
      fetchQuery(`
        query {
          getTokenPrices(
            inputs: [
              { address: "${token}", networkId: ${chain} }
            ]
          ) {
            address
            networkId
            priceUsd
          }
        }
      `),

    select(data) {
      if (data?.data?.getTokenPrices) {
        return data.data.getTokenPrices[0]?.priceUsd ?? 0;
      }
      return undefined;
    },
  });
};

export const useGetPriceRangeData = (
  queryKey: string[],
  address: string,
  chainId: number,
  from: number,
  to: number
) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchPriceChartRange(address, chainId, from, to),
    staleTime: 600000,
  });
};

export const useGetPriceMetaData = (
  queryKey: string[],
  address: string,
  chainId: number
) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchTokenMetadata(address, chainId),
    staleTime: 600000,
  });
};

export const useGetTopTokens = (queryKey: string[], chainId: number) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchTopTokens(chainId),
    staleTime: 600000,
  });
};

export const useGetTopPools = (
  queryKey: string[],
  chainId: number,
  address?: string
) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchTopPools(chainId, address),
    staleTime: 600000,
  });
};

export const useGetTokensTxn = (
  queryKey: string[],
  address: string,
  chainId: number,
  cursor: string | null
) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchTokensTxn(address, chainId, cursor),
  });
};

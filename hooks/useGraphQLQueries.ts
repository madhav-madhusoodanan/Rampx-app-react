import { getWeekTimestamps } from "@/lib/utils";
import { TopPools, TopTokens, TopTokensResponse } from "@/types/tokens";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchQuery = async (query: string) => {
  const response = await axios.post(
    "https://graph.codex.io/graphql",
    {
      query,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_CODEX_API_KEY,
      },
    }
  );
  return response.data;
};

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

const fetchPriceChartRange = async (
  address: string,
  chainId: number,
  from: number,
  to: number
) => {
  const data = await fetchQuery(`
      query {
        getBars(
          symbol: "${address}:${chainId}"
          from: ${from}
          to: ${to}
          resolution: "720"
        ) {
          c
        }
      }
      `);

  const prices = data.data.getBars.c;

  const priceObjects = prices.map((price: number) => ({
    price: price,
  }));

  return priceObjects;
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
  });
};

const fetchTokenMetadata = async (address: string, chainId: number) => {
  const data = await fetchQuery(`
    {
        filterTokens(
            filters: {
                network: [${chainId}],
            }
        limit: 1
    tokens:["${address}"]
  ) {
    results {
      change24
    }
  }
}
    `);
  return data.data.filterTokens.results;
};

export const useGetPriceMetaData = (
  queryKey: string[],
  address: string,
  chainId: number
) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchTokenMetadata(address, chainId),
  });
};

const fetchTopTokens = async (chainId: number) => {
  const data = await fetchQuery(`
      query {
        listTopTokens(limit: 20 networkFilter: [${chainId}]) {
          name
          symbol
          address
          imageThumbUrl
          price
          priceChange1
          priceChange24
          volume
          liquidity
        }
      }
  `);

  const toptokens = data.data.listTopTokens as TopTokens[];
  const { fromTimestamp, toTimestamp } = getWeekTimestamps();

  const updatedTopTokens = await Promise.all(
    toptokens.map(async (token) => {
      const isPositiveHour = token.priceChange1 >= 0;
      const isPositiveDay = token.priceChange24 >= 0;

      const chartData = await fetchPriceChartRange(
        token.address,
        chainId,
        fromTimestamp,
        toTimestamp
      );

      return {
        ...token,
        isPositiveHour,
        isPositiveDay,
        chartData,
      };
    })
  );

  return updatedTopTokens;
};

export const useGetTopTokens = (queryKey: string[], chainId: number) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchTopTokens(chainId),
  });
};

const fetchTopPools = async (chainId: number) => {
  const data = await fetchQuery(`
        query {
  filterPairs(
    rankings: { attribute: buyCount24, direction: DESC }
    limit: 15
    filters: {network:${chainId}}
  ) {
    results {
      liquidity
      volumeUSD1
      volumeUSD24
      exchange {
        name
      }
      token0 {
        symbol
        info{
          imageThumbUrl
        }
        address
        name
      }
      token1 {
        symbol
        info{
          imageThumbUrl
        }
        address
        name
      }
    }
  }
}
        `);
  return data.data.filterPairs.results as TopPools[];
};

export const useGetTopPools = (queryKey: string[], chainId: number) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchTopPools(chainId),
  });
};

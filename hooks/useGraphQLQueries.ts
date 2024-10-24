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
          resolution: "1D"
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

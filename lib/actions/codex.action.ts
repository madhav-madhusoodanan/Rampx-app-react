import { TopPools, TopTokens } from "@/types/tokens";
import { getTimestamps } from "../utils";

export const fetchQuery = async (query: string) => {
  try {
    const response = await fetch("/api/external", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchQuery:", error);
    throw error;
  }
};

export const fetchPriceChartRange = async (
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
            resolution: "60"
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

export const fetchTokenMetadata = async (address: string, chainId: number) => {
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

export const fetchTopTokens = async (chainId: number) => {
  try {
    const data = await fetchQuery(`
          query {
            listTopTokens(limit: 50 networkFilter: [${chainId}]) {
              name
              symbol
              address
              imageThumbUrl
              networkId
              decimals
              price
              priceChange1
              priceChange24
              volume
              liquidity
            }
          }
      `);

    const toptokens = data.data.listTopTokens as TopTokens[];
    const ids = toptokens.map(
      (token) => `"${token.address}:${token.networkId}"`
    );
    const tokensChartData = await fetchTokensChartBulk(ids);

    const updatedTopTokens = await Promise.all(
      toptokens.map(async (token) => {
        const isPositiveHour = token.priceChange1 >= 0;
        const isPositiveDay = token.priceChange24 >= 0;
        const chartData =
          tokensChartData?.tokenSparklines?.find(
            (chart: any) =>
              chart.id?.toLowerCase() ===
              `${token.address.toLowerCase()}:${token.networkId}`
          )?.sparkline || [];

        return {
          ...token,
          isPositiveHour,
          isPositiveDay,
          chartData,
        };
      })
    );

    return updatedTopTokens;
  } catch (error) {
    console.log("error in fetching top tokens ====", error);
    return [];
  }
};

export const fetchTopPools = async (chainId: number, address?: string) => {
  const data = await fetchQuery(`
          query {
    filterPairs(
      ${address ? `phrase: "${address}"` : ""}
      rankings: { attribute: buyCount24, direction: DESC }
      limit: 50
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

export const fetchTokensTxn = async (
  address: string,
  chainId: number,
  cursor: string | null = null
): Promise<any> => {
  const data = await fetchQuery(`
      query {
        getTokenEvents(
          query: {address:"${address}", networkId:${chainId}}
          limit: 10
          cursor: ${cursor ? `"${cursor}"` : null}
        ) {
          cursor
          items {
            eventDisplayType
            timestamp
            quoteToken
            token1SwapValueUsd
            liquidityToken
            transactionHash
            maker
            data {
              ... on SwapEventData {
                amount0In
                amount0Out
                amount1In
                amount1Out
                amount0
                amount1
                amountNonLiquidityToken
                priceUsd
                priceUsdTotal
                priceBaseToken
                priceBaseTokenTotal
                type
              }
            }
          }
        }
      }
    `);

  const { items, cursor: pageCursor } = data?.data.getTokenEvents || {};
  return { items, pageCursor };
};

export const fetchTokensChartBulk = async (ids: string[]) => {
  const query = `query {
  tokenSparklines(input: { ids: [${ids}] }) {
    attribute
    id
    sparkline {
      value
    }
  }
}`;
  const data = await fetchQuery(query);
  return data.data;
};

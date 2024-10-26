export interface TokenInfo {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  weight?: number;
}

export interface TokenAPIResponse {
  [key: string]: TokenInfo[];
}

export interface TopTokens {
  name: string;
  symbol: string;
  address: string;
  imageThumbUrl: string;
  price: number;
  priceChange1: number;
  priceChange24: number;
  volume: string;
  liquidity: string;
}

export interface TopTokensResponse extends TopTokens {
  isPositiveHour: boolean;
  isPositiveDay: boolean;
  chartData: { price: number }[];
}

export interface TopPools {
  liquidity: string;
  volumeUSD1: string;
  volumeUSD24: string;
  exchange: {
    name: string;
  };
  token0: {
    symbol: string;
    info: {
      imageThumbUrl: string;
    };
    address: string;
    name: string;
  };
  token1: {
    symbol: string;
    info: {
      imageThumbUrl: string;
    };
    address: string;
    name: string;
  };
}

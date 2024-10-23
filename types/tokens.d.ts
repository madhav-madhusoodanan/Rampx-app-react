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

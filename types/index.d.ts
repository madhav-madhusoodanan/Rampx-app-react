export interface FooterIcon {
  imgURL: string;
  link: string;
  label: string;
}

export interface GetUserErc20TokensParams {
  address: `0x${string}` | undefined;
  contractAddress?: string[];
  chainId: number;
}

export interface GetErc20TokenBySearchParams {
  contractAddress: string;
  chainId: number;
}

// export interface TokenBalance {
//   contractAddress: string;
//   tokenBalance: string;
//   tokenName: string;
//   tokenSymbol: string | null;
//   tokenLogo: string | null;
// }

export type TokenMetadata = {
  decimals: number;
  name: string;
  symbol: string;
  logo: string;
};

export interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

export interface ApiResponse {
  status: string;
  message: string;
  result: Transaction[];
}

export interface UniqueContract {
  contractAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenLogo: string;
  tokenBalance: string;
}

export interface SIWEConfig {
  // Required
  getNonce: () => Promise<string>;
  createMessage: (args: SIWECreateMessageArgs) => string;
  verifyMessage: (args: SIWEVerifyMessageArgs) => Promise<boolean>;
  getSession: () => Promise<SIWESession | null>;
  signOut: () => Promise<boolean>;

  // Optional
  onSignIn?: (session?: SIWESession) => void;
  onSignOut?: () => void;
  // Defaults to true
  enabled?: boolean;
  // In milliseconds, defaults to 5 minutes
  nonceRefetchIntervalMs?: number;
  // In milliseconds, defaults to 5 minutes
  sessionRefetchIntervalMs?: number;
  // Defaults to true
  signOutOnDisconnect?: boolean;
  // Defaults to true
  signOutOnAccountChange?: boolean;
  // Defaults to true
  signOutOnNetworkChange?: boolean;
}

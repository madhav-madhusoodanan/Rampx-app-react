export type PriceApiResponse = {
  blockNumber: string;
  buyAmount: string;
  buyToken: string;
  fees: {
    integratorFee: string | null;
    zeroExFee: string | null;
    gasFee: string | null;
  };
  gas: string;
  gasPrice: string;
  issues: {
    allowance: {
      actual: string;
      spender: string;
    };
    balance: {
      token: string;
      actual: string;
      expected: string;
    };
    simulationIncomplete: boolean;
    invalidSourcesPassed: any[];
  };
  liquidityAvailable: boolean;
  minBuyAmount: string;
  route: {
    fills: {
      from: string;
      to: string;
      source: string;
      proportionBps: string;
    }[];
    tokens: {
      address: string;
      symbol: string;
    }[];
  };
  sellAmount: string;
  sellToken: string;
  tokenMetadata: {
    buyToken: {
      buyTaxBps: string;
      sellTaxBps: string;
    };
    sellToken: {
      buyTaxBps: string;
      sellTaxBps: string;
    };
  };
  totalNetworkFee: string;
  zid: string;
};

export type PriceApiParams = {
  chainId: number;
  sellToken: string;
  buyToken: string;
  sellAmount?: string;
  buyAmount?: string;
  taker: string;
  swapFeeRecipient?: string;
  swapFeeBps?: number;
  swapFeeToken?: string;
  tradeSurplusRecipient?: string;
  gasPrice?: string;
  slippageBps?: number;
  txOrigin?: string;
  excludedSources?: string;
};

export interface QouteApiParams {
  chainId: number;
  buyToken: string;
  sellToken: string;
  sellAmount: string;
  taker: string;
  txOrigin?: string;
  swapFeeRecipient?: string;
  swapFeeBps?: number;
  swapFeeToken?: string;
  tradeSurplusRecipient?: string;
  gasPrice?: string;
  slippageBps?: number;
  excludedSources?: string;
}

export interface QouteApiResponse {
  blockNumber: string;
  buyAmount: string;
  buyToken: string;
  fees: Fees;
  issues: Issues;
  liquidityAvailable: boolean;
  minBuyAmount: string;
  permit2: Permit2;
  route: Route;
  sellAmount: string;
  sellToken: string;
  tokenMetadata: TokenMetadata;
  totalNetworkFee: string | null;
  transaction: Transaction;
  zid: string;
}

interface Transaction {
  to: `0x${string}`;
  data: `0x${string}`;
  gas: string | null;
  gasPrice: string;
  value: string;
}

interface TokenTaxMetadata {
  buyTaxBps: string;
  sellTaxBps: string;
}

interface TokenMetadata {
  buyToken: TokenTaxMetadata;
  sellToken: TokenTaxMetadata;
}

interface FeeObject {
  amount: string;
  token: string;
  type: string;
}

interface AllowanceIssue {
  actual: string;
  spender: string;
}

export interface Fill {
  from: string;
  to: string;
  source: string;
  proportionBps: string;
}

export interface Token {
  address: string;
  symbol: string;
}

export interface Route {
  fills: Fill[];
  tokens: Token[];
}

interface Fees {
  integratorFee: FeeObject | null;
  zeroExFee: FeeObject | null;
  gasFee: FeeObject | null;
}

interface BalanceIssue {
  token: string;
  actual: string;
  expected: string;
}

interface Permit2 {
  type: string;
  hash: string;
  eip712: Permit2EIP712;
}

interface Permit2EIP712Domain {
  name?: string;
  chainId?: number;
  verifyingContract?: `0x${string}`;
  salt?: `0x${string}`;
  version?: string;
}

interface Permit2Message {
  [key: string]: any;
}

interface Permit2EIP712 {
  types: {
    [key: string]: { name: string; type: string }[];
  };
  domain: Permit2EIP712Domain;
  message: Permit2Message;
  primaryType: string;
}

interface Issues {
  allowance: AllowanceIssue | null;
  balance: BalanceIssue | null;
  simulationIncomplete: boolean;
  invalidSourcesPassed: string[];
}

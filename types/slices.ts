import { PriceApiResponse, QouteApiResponse } from "./actions";
import { TokenSelection } from "./enums";
import { TokenInfo } from "./tokens";

export type LoadingsSlice = {
  txInProgress: boolean;
  tokensListLoading: boolean;
  isBalanceLoading: boolean;
};
export type TokenBalances = Record<string, string>;
export type NativeCurrency = {
  symbol: string;
  balance: string;
};

export type AppSlice = {
  walletAddress: string;
  isTokenModalOpen: boolean;
  chainId: number;
  successTxCount: number;
  tokenBalances: TokenBalances;
  nativeCurrency: NativeCurrency;
};

export type SwapSlice = {
  tokenA: TokenInfo;
  tokenB?: TokenInfo;
  isSwapPriceLoading: boolean;
  swapPrice?: PriceApiResponse;
  qouteData?: QouteApiResponse;
  amountA: string;
  amountB: string;
  maxSlippage: string | undefined;
  isQouteDataLoading: boolean;
  tokenSelection: TokenSelection;
};

import { PriceApiResponse, QouteApiResponse } from "./actions";
import { TokenSelection } from "./enums";
import { TokenInfo } from "./tokens";

export type LoadingsSlice = {
  txInProgress: boolean;
  tokensListLoading: boolean;
};

export type AppSlice = {
  walletAddress: string;
  isTokenModalOpen: boolean;
  chainId: number;
  successTxCount: number;
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

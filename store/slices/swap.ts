import { WETH_TOKEN_INFO } from "@/constants";
import { PriceApiResponse, QouteApiResponse } from "@/types/actions";
import { SwapSlice } from "@/types/slices";
import { TokenInfo } from "@/types/tokens";
import { TokenSelection } from "@/types/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formatUnits } from "viem";
import { WRAPPED_COINS_INFO } from "@/constants/tokens";

const initialState: SwapSlice = {
  isSwapPriceLoading: false,
  swapPrice: undefined,
  qouteData: undefined,
  amountA: "",
  amountB: "",
  tokenA: WETH_TOKEN_INFO,
  tokenB: undefined,
  maxSlippage: undefined,
  isQouteDataLoading: false,
  tokenSelection: TokenSelection.A,
  transactionDeadline: "30",
};

const swap = createSlice({
  name: "swap",
  initialState,
  reducers: {
    setTokenA(state, action: PayloadAction<TokenInfo>) {
      state.tokenA = action.payload;
    },
    setTokenB(state, action: PayloadAction<TokenInfo | undefined>) {
      state.tokenB = action.payload;
    },
    setTokenAmountA(state, action: PayloadAction<string>) {
      state.amountA = action.payload;
    },
    setTokenAmountB(state, action: PayloadAction<string>) {
      state.amountB = action.payload;
    },
    setIsSwapPriceLoading(state, action: PayloadAction<boolean>) {
      state.isSwapPriceLoading = action.payload;
    },
    setSwapPrice(state, action: PayloadAction<PriceApiResponse | undefined>) {
      if (action.payload && state?.tokenB) {
        state.amountB = formatUnits(
          BigInt(action.payload.buyAmount),
          state.tokenB.decimals
        ).toString();
      } else {
        state.amountB = "";
      }
      state.swapPrice = action.payload;
    },
    setMaxSlippage(state, action: PayloadAction<string | undefined>) {
      state.maxSlippage = action.payload;
    },
    setIsQouteDataLoading(state, action: PayloadAction<boolean>) {
      state.isQouteDataLoading = action.payload;
    },
    setQouteData(state, action: PayloadAction<QouteApiResponse | undefined>) {
      state.qouteData = action.payload;
    },
    setTokenSelection(state, action: PayloadAction<TokenSelection>) {
      state.tokenSelection = action.payload;
    },
    exchangeTokens(state) {
      if (state?.tokenB) {
        const tempToken = state.tokenA;
        state.tokenA = state.tokenB;
        state.tokenB = tempToken;
        const tempAmount = state.amountA;
        state.amountA = state.amountB;
        state.amountB = tempAmount;
      }
    },
    onChainChange(state, action: PayloadAction<number>) {
      state.tokenA = WRAPPED_COINS_INFO[action.payload];
      state.tokenB = undefined;
      state.amountA = "";
      state.amountB = "";
    },
    setTransactionDeadline(state, action: PayloadAction<string>) {
      state.transactionDeadline = action.payload;
    },
  },
});

export default swap.reducer;

export const {
  setIsSwapPriceLoading,
  setSwapPrice,
  setMaxSlippage,
  setQouteData,
  setIsQouteDataLoading,
  setTokenSelection,
  setTokenAmountA,
  setTokenAmountB,
  exchangeTokens,
  setTokenA,
  setTokenB,
  onChainChange,
  setTransactionDeadline,
} = swap.actions;

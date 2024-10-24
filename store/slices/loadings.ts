import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingsSlice } from "@/types/slices";

const initialState: LoadingsSlice = {
  txInProgress: false,
  tokensListLoading: false,
  isBalanceLoading: false,
};

const loadings = createSlice({
  name: "loadings",
  initialState,
  reducers: {
    setTxInProgress(state, action: PayloadAction<boolean>) {
      state.txInProgress = action.payload;
    },
    setTokensListLoading(state, action: PayloadAction<boolean>) {
      state.tokensListLoading = action.payload;
    },
    setIsBalanceLoading(state, action: PayloadAction<boolean>) {
      state.isBalanceLoading = action.payload;
    },
  },
});

export default loadings.reducer;

export const { setTxInProgress, setTokensListLoading, setIsBalanceLoading } =
  loadings.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingsSlice } from "@/types/slices";

const initialState: LoadingsSlice = {
  txInProgress: false,
  successCount: 0,
  tokensListLoading: false,
};

const loadings = createSlice({
  name: "loadings",
  initialState,
  reducers: {
    setTxInProgress(state, action: PayloadAction<boolean>) {
      state.txInProgress = action.payload;
    },
    incrementSuccessTxCount(state) {
      state.successCount += 1;
    },
    setTokensListLoading(state, action: PayloadAction<boolean>) {
      state.tokensListLoading = action.payload;
    },
  },
});

export default loadings.reducer;

export const {
  setTxInProgress,
  incrementSuccessTxCount,
  setTokensListLoading,
} = loadings.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingsSlice } from "@/types/slices";

const initialState: LoadingsSlice = {
  txInProgress: false,
  successCount: 0,
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
  },
});

export default loadings.reducer;

export const { setTxInProgress, incrementSuccessTxCount } = loadings.actions;

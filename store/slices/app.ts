import { AppSlice } from "@/types/slices";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppSlice = {
  walletAddress: "",
  isTokenModalOpen: false,
  chainId: 1,
  successTxCount: 0,
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    setWalletAddress(state, action: PayloadAction<string>) {
      state.walletAddress = action.payload;
    },
    setIsTokenModalOpen(state, action: PayloadAction<boolean>) {
      state.isTokenModalOpen = action.payload;
    },
    setChainId(state, action: PayloadAction<number>) {
      state.chainId = action.payload;
    },
    incrementSuccessTxCount(state) {
      state.successTxCount = state.successTxCount + 1;
    },
  },
});

export default app.reducer;

export const {
  setWalletAddress,
  setIsTokenModalOpen,
  setChainId,
  incrementSuccessTxCount,
} = app.actions;

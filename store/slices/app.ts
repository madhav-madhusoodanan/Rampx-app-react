import { AppSlice } from "@/types/slices";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppSlice = {
  walletAddress: "",
  isTokenModalOpen: false,
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
  },
});

export default app.reducer;

export const { setWalletAddress, setIsTokenModalOpen } = app.actions;

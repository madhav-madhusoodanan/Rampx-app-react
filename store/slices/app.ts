import { AppSlice } from "@/types/slices";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppSlice = {
  walletAddress: "",
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    setWalletAddress(state, action: PayloadAction<string>) {
      state.walletAddress = action.payload;
    },
  },
});

export default app.reducer;

export const { setWalletAddress } = app.actions;

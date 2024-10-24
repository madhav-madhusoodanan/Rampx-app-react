import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ExploreSlice, ExploreTabs } from "@/types/slices";

const initialState: ExploreSlice = {
  currentTab: ExploreTabs.TOKENS,
};

const explore = createSlice({
  name: "explore",
  initialState,
  reducers: {
    setCurrentTab(state, action: PayloadAction<ExploreTabs>) {
      state.currentTab = action.payload;
    },
  },
});

export default explore.reducer;

export const { setCurrentTab } = explore.actions;

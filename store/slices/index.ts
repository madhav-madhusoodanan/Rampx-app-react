import { combineReducers } from "@reduxjs/toolkit";

import app from "@/store/slices/app";
import loadings from "@/store/slices/loadings";
import swap from "@/store/slices/swap";
import explore from "@/store/slices/explore";

export const reducers = combineReducers({
  app,
  loadings,
  swap,
  explore,
});

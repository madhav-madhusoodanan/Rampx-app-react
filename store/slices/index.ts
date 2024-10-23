import { combineReducers } from "@reduxjs/toolkit";

import app from "@/store/slices/app";
import loadings from "@/store/slices/loadings";

export const reducers = combineReducers({
  app,
  loadings,
});

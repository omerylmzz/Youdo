import { configureStore } from "@reduxjs/toolkit";
import ColorCategorySlice from "./slices/ColorCategorySlice";

export const Store = configureStore({
  reducer:{
    colorCategory: ColorCategorySlice.reducer
  }
})

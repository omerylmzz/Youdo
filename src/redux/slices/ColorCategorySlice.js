import { createSlice } from "@reduxjs/toolkit";
import ColorCategoryData from "../../data/ColorCategoryData";

const ColorCategorySlice = createSlice({
  name: "colorCategory",
  initialState:{
    data: ColorCategoryData,
    selectedId: 0,
    selectedColor: "#E72929"
  },
  reducers:{
    selectColor(state, action) {
      state.data[state.selectedId].selected = false;
      state.data[action.payload.id].selected = true;
      state.selectedId = action.payload.id;
      state.selectedColor = action.payload.color;
    }
  },
});

export const { selectColor } = ColorCategorySlice.actions;

export default ColorCategorySlice;

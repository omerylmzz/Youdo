import { createSlice } from "@reduxjs/toolkit";
import ColorCategoryData from "../../data/ColorCategoryData";

const ColorCategorySlice = createSlice({
  name:"colorCategory",
  initialState:{
    array: ColorCategoryData,
    selectedId: 0
  },
  reducers:{
    selectColor(state, action) {
      const selectedItem = state.array.filter((item) => item.selected === true).map(i => i.id);
      state.array[selectedItem].selected = false;
      state.array[action.payload.id].selected = true;
      state.selectedId = action.payload.id;
    }
  },
});

export const { selectColor } = ColorCategorySlice.actions;

export default ColorCategorySlice;

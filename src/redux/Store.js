import { configureStore } from "@reduxjs/toolkit";
import ColorCategorySlice from "./slices/ColorCategorySlice";
import { SignUpSlice, SignInSlice } from "./slices/RegistrationSlice";
import { AllTasksSlice, CalendarSlice } from "./slices/AllTasksSlice";
import { DailyTasksSlice } from "./slices/ProgressSlice";

export const Store = configureStore({
  reducer:{
    colorCategory: ColorCategorySlice.reducer,
    signup: SignUpSlice.reducer,
    signin: SignInSlice.reducer,
    calendar: CalendarSlice.reducer,
    dailyTasks: DailyTasksSlice.reducer,
    allTasks: AllTasksSlice.reducer
  }
})

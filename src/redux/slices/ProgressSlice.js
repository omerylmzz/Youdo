import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../../api/client";

export const getDailyTasks = createAsyncThunk("Daily Tasks", async () => {
  try {
    const ACCESS_TOKEN = await AsyncStorage.getItem("ACCESS_TOKEN");

    const headers = {
      "Content-Type": "application/json",
      "X-Auth-User-Token": ACCESS_TOKEN
    }

    const response = await client.get("/task/daily", { headers });

    return response.data;
  }
  catch(error) {
    console.log("DAILY TASKS ASYNC THUNK ERROR: " + error);
    throw error;
  }
})

const DailyTasksSlice = createSlice({
  name: "dailyTasks",
  initialState:{
    data: [],
    loading: false,
    successful: false,
    message: ""
  },
  reducers:{
    updateTask(state, action){
      const Index = state.data.findIndex((item) => item._id === action.payload._id);
      state.data[Index].COMPLETED = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDailyTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDailyTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.successful = action.payload.SUCCESSFUL;
        state.message = action.payload.MESSAGE;
        state.successful ? state.data = action.payload.DATA : state.data = [];
      })
      .addCase(getDailyTasks.rejected, (state) => {
        state.loading = false;
        state.successful = false;
        state.message = "Something went wrong";
      })
  }
})

export const { updateTask} = DailyTasksSlice.actions;

export { DailyTasksSlice };

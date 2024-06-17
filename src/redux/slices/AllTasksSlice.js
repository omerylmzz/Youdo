import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import client from "../../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CalendarSlice = createSlice({
  name: "calendar",
  initialState:{
    data: [],
    selectedDate: {
      day: moment().add(0, "day").format("D"),
      month: moment().add(0, "day").format("MMM"),
      year: moment().add(0, "day").format("Y"),
      name: moment().add(0, "day").format("dddd")
    }
  },
  reducers:{
    getCalendar(state){
      // Empty array
      const date = [];
      // Gives the current day
      const today = moment().format("D");  // output: 12
      // Gives the number of days in the current month
      const daysOfMonth = moment(moment()).daysInMonth(); // output: 30
      const max = daysOfMonth - today === 0 ? 4 : daysOfMonth - today === 1 ? 3 : 2; // output: 4 || 3 || 2

      // Returns previous days in object
      for (let i = 1; i <= max; i++){
        const previousDays = {
          day: moment().subtract(i, "day").format("D"),
          month: moment().subtract(i, "day").format("MMM"),
          year: moment().subtract(i, "day").format("Y"),
          name: moment().subtract(i, "day").format("dddd"),
          selected: false
        }
        // Pushes objects to the beginning of the array
        date.unshift(previousDays);
      }

      // Returns next days in object
      for (let i = 0; i <= daysOfMonth - today; i++){
        const month = {
          day: moment().add(i, "day").format("D"),
          month: moment().add(i, "day").format("MMM"),
          year: moment().subtract(i, "day").format("Y"),
          name: moment().add(i, "day").format("dddd"),
          selected: i === 0
        }
        // Pushes objects into array
        date.push(month);
      }
      // Synchronises the array in the state with the filled array
      state.data = date;
    },
    selectDate(state, action){
      const selectedIndex = state.data.findIndex(item => item.selected === true);
      const actionIndex = state.data.findIndex((item) => item.day === action.payload.day);
      state.data[selectedIndex].selected = false;
      state.data[actionIndex].selected = true;
      state.selectedDate = state.data[actionIndex];
    }
  },
});
export const getAllTasks = createAsyncThunk("All Tasks", async () => {
  try {

    const ACCESS_TOKEN = await AsyncStorage.getItem("ACCESS_TOKEN");

    const headers = {
      "Content-Type": "application/json",
      "X-Auth-User-Token": ACCESS_TOKEN
    }

    const response = await client.get("/task/all", { headers });

    return response.data;
  }
  catch(error) {
    console.log("ALL TASKS ASYNC THUNK ERROR: " + error);
    throw error
  }
});

const AllTasksSlice = createSlice({
  name: "allTasks",
  initialState:{
    data: [],
    loading: false,
    successful: false,
    message: ""
  },
  reducers: {
    deleteTask(state, action){
      const Index = state.data.findIndex((item) => item._id === action.payload._id);
      state.data.splice(Index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.successful = action.payload.SUCCESSFUL;
        state.message = action.payload.MESSAGE;
        state.successful ? state.data = action.payload.DATA : state.data = [];
      })
      .addCase(getAllTasks.rejected, (state) => {
        state.loading = false;
        state.successful = false;
        state.message = "Something went wrong";
      })
  }
})


export const { getCalendar, selectDate } = CalendarSlice.actions;
export const { deleteTask } = AllTasksSlice.actions;

export {CalendarSlice, AllTasksSlice};

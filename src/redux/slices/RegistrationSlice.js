import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const handleSignUp = createAsyncThunk("user/signup", async ({name, surname, mail, password}) => {
  try {
    const response = await client.post("/user/signup", {
      NAME: name,
      SURNAME: surname,
      MAIL: mail,
      PASSWORD: password
    });
    return response.data;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
})

const SignUpSlice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    successful: false,
    message: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleSignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.successful = action.payload.SUCCESSFUL;
        state.message = action.payload.MESSAGE;
      })
      .addCase(handleSignUp.rejected, (state, action) => {
        state.loading = false;
        state.successful = false;
        state.message = "Something went wrong";
      })
  },
})

export const handleSignIn = createAsyncThunk("user/signin", async ({mail, password}) => {
  try {
    const response = await client.post("/user/signin", {
      MAIL: mail,
      PASSWORD: password
    });
    return response.data;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
})

const SignInSlice = createSlice({
  name: "signin",
  initialState: {
    loading: false,
    successful: false,
    message: "",
    token: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleSignIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.successful = action.payload.SUCCESSFUL;
        state.message = action.payload.MESSAGE;
        state.successful ? state.token = action.payload.ACCESS_TOKEN : state.token = "";
      })
      .addCase(handleSignIn.rejected, (state) => {
        state.loading = false;
        state.successful = false;
        state.message = "Something went wrong";
      })
  }
})



export { SignUpSlice, SignInSlice };

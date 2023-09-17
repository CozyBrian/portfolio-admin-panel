import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  isAuthenticated: boolean;
};

const initialState: initialStateType = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export default authSlice;

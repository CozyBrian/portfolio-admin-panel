import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  isAuthenticated: boolean;
};

const initialState: initialStateType = {
  isAuthenticated:
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken") !== null
      : false,
};

const authSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export default authSlice;

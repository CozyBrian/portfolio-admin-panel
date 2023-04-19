import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  selectedProjectId: string;
};

const initialState: initialStateType = {
  selectedProjectId: "AA",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedTabId(state, action: PayloadAction<string>) {
      state.selectedProjectId = action.payload;
    },
  },
});

export default appSlice;

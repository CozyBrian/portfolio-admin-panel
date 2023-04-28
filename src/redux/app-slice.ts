import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  selectedProjectId: string;
  tabs: {
    id: string;
    title: string;
  }[];
};

const initialState: initialStateType = {
  tabs: [
    {
      id: "/",
      title: "Projects",
    },
    {
      id: "/work",
      title: "Work",
    },
    {
      id: "/profile",
      title: "Profile",
    },
  ],
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

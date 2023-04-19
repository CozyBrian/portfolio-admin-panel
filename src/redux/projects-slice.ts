import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from ".";
import { Project } from "@/types";

type initialStateType = {
  items: Project[];
};

const initialState = (): initialStateType => {
  if (loadFromLocalStorage() !== undefined) {
    return loadFromLocalStorage()!.projects;
  } else {
    return {
      items: [
        {
          id: "AA",
          title: "Sitenary",
        },
        {
          id: "AB",
          title: "Etonote",
        },
        {
          id: "AC",
          title: "QuakerMan",
        },
        {
          id: "AD",
          title: "SpotiStats",
        },
      ],
    };
  }
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.items = action.payload;
    },
  },
});

export default projectsSlice;

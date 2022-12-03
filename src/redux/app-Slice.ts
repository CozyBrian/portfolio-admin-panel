import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { project } from "../@types/project";

interface app_state {
  selectedContent: string;
  selectedProductId: string;
  projects: project[];
  tempProject?: project;
}

const initialState: app_state = {
  selectedContent: "Projects",
  selectedProductId: "MealsToGo",
  projects: [],
};

const appState = createSlice({
  name: "appState",
  initialState,
  reducers: {
    loadProjects(state, action) {
      let tempProjects: project[] = [];
      Object.entries(action.payload).forEach(([key, value], index) => {
        tempProjects.push(value as project);
      });
      state.projects = tempProjects;
      state.selectedProductId = state.projects[0].id;
    },
    setSelectedProductId(state, action: PayloadAction<string>) {
      state.selectedProductId = action.payload;
    },
    setProject(state, action: PayloadAction<project>) {
      state.tempProject = action.payload;
    },
    addNewProject(state) {
      const temp = {
        id: nanoid(16),
        title: "Untitled",
        image: "",
        type: "web",
        link: "",
        disc: "",
        live: "",
        tags: [],
      };
      state.projects.push(temp);
      state.selectedProductId = temp.id;
    },
  },
});

export default appState;

import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { Project } from "@/types";

type initialStateType = {
  selectedProjectId: string;
  items: Project[];
};

const initialState: initialStateType = {
  selectedProjectId: "AA",
  items: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action) {
      let tempProjects: Project[] = [];
      Object.entries(action.payload).forEach(([_, value], __) => {
        tempProjects.push(value as Project);
      });
      state.items = tempProjects;
      state.selectedProjectId = tempProjects[0].id;
    },
    setSelectedTabId(state, action: PayloadAction<string>) {
      state.selectedProjectId = action.payload;
    },
    addNewProject(state) {
      const temp: Project = {
        id: nanoid(16),
        title: "Untitled",
        image: [""],
        type: "web",
        link: "",
        disc: "",
        live: "",
        tags: [],
      };
      state.items.push(temp);
      state.selectedProjectId = temp.id;
    },
    updateProject(state, action: PayloadAction<Project>) {
      const temp = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[temp] = action.payload;
    },
  },
});

export default projectsSlice;

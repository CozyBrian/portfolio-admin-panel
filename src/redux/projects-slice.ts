import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { Profile, Project, Work } from "@/types";

type initialStateType = {
  selectedProjectId: string;
  selectedWorkId: string;
  items: Project[];
  profile: Profile;
  works: Work[];
};

const initialState: initialStateType = {
  selectedProjectId: "AA",
  selectedWorkId: "AA",
  items: [],
  works: [],
  profile: {
    profileImage: "",
    resume: "",
  },
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
    setWorks(state, action) {
      let tempWorks: Work[] = [];
      Object.entries(action.payload).forEach(([_, value], __) => {
        tempWorks.push(value as Work);
      });
      state.works = tempWorks;
      state.selectedWorkId = tempWorks[0].id;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setSelectedTabId(state, action: PayloadAction<string>) {
      state.selectedProjectId = action.payload;
    },
    setSelectedWorkId(state, action: PayloadAction<string>) {
      state.selectedWorkId = action.payload;
    },
    addNewWork(state) {
      const temp: Work = {
        id: nanoid(16),
        company: "Untitled",
        description: [""],
        position: "",
        image: "",
        startDate: "",
        endDate: "",
      };
      state.works.push(temp);
      state.selectedWorkId = temp.id;
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

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
    setProjects(
      state,
      action: PayloadAction<{
        [key: string]: Project;
      }>
    ) {
      let tempProjects: Project[] = [];
      Object.entries(action.payload).forEach(([_, value], i) => {
        if (value.pos === undefined) {
          value.pos = i;
        }
        tempProjects.push(value);
      });
      const sortedTempProjects = tempProjects.sort((a, b) => a.pos! - b.pos!);
      state.items = sortedTempProjects;
      state.selectedProjectId = tempProjects[0].id;
    },
    setWorks(
      state,
      action: PayloadAction<{
        [key: string]: Work;
      }>
    ) {
      let tempWorks: Work[] = [];
      Object.entries(action.payload).forEach(([_, value], i) => {
        if (value.pos === undefined) {
          value.pos = i;
        }
        tempWorks.push(value);
      });
      const sortedTempWorks = tempWorks.sort((a, b) => a.pos! - b.pos!);
      state.works = sortedTempWorks;
      state.selectedWorkId = tempWorks[0].id;
    },
    setReorderProjects(state, action: PayloadAction<Project[]>) {
      state.items = action.payload;
    },
    setReorderWorks(state, action: PayloadAction<Work[]>) {
      state.works = action.payload;
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
        pos: state.works.length,
        stack: [],
        url: "",
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
        pos: state.items.length,
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

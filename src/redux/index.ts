import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app-slice";
import authSlice from "./auth-slice";
import projectsSlice from "./projects-slice";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

function saveToLocalStorage(state: RootState) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
export const loadFromLocalStorage = (): RootState | undefined => {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    const state: RootState = JSON.parse(serialisedState);
    return state;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

export const action = {
  auth: authSlice.actions,
  app: appSlice.actions,
  projects: projectsSlice.actions,
};

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    app: appSlice.reducer,
    projects: projectsSlice.reducer,
  },
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;

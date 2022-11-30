import { configureStore } from "@reduxjs/toolkit";
import appState from "./app-Slice";
import systemState from "./system-slice";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const action = {
  app: appState.actions,
  system: systemState.actions,
};

const store = configureStore({
  reducer: {
    app: appState.reducer,
    system: systemState.reducer,
  },
});

export default store;

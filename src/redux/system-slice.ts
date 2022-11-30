import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface system_state {
  isAuthenticated: boolean;
  isMenuOpen: boolean;
  isModalOpen: boolean;
  loading: boolean;
  error: string;
}

const initialState: system_state = {
  isAuthenticated: false,
  isMenuOpen: false,
  isModalOpen: false,
  loading: false,
  error: "",
};

const systemState = createSlice({
  name: "systemState",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setIsMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMenuOpen = action.payload;
    },
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
  },
});

export default systemState;

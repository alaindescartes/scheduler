import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loadingState",
  initialState,
  reducers: {
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    resetLoadingState: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoadingState, resetLoadingState } = loadingSlice.actions;

export default loadingSlice.reducer;

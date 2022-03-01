import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  structure: {},
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    initializeFile: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { initializeFile } = fileSlice.actions;

export default fileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import file from "../../file.json";

import { createStructureId } from "../../helper/createStructureId";

const initialState = {
  structure: createStructureId(file),
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

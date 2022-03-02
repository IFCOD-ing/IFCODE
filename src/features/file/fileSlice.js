import { createSlice } from "@reduxjs/toolkit";
import file from "../../file.json";

import { createStructureId, addFileById } from "../../helper/searchDfs";

const initialState = {
  structure: createStructureId(file),
  updateFile: "",
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    registeredUpdateFile: (state, action) => {
      const { id } = action.payload;
      state.updateFile = id;
    },
    cancelUpdateFile: (state) => {
      state.updateFile = "";
    },
    addFile: (state, action) => {
      const { name } = action.payload;
      addFileById(state.structure, state.updateFile, name);
      state.updateFile = "";
    },
  },
});

export const { registeredUpdateFile, cancelUpdateFile, addFile } =
  fileSlice.actions;

export default fileSlice.reducer;

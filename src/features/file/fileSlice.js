import { createSlice } from "@reduxjs/toolkit";
import file from "../../file.json";

import {
  createStructureId,
  addFileById,
  findFileById,
} from "../../helper/searchDfs";

const initialState = {
  structure: createStructureId(file),
  updateFile: "",
  openedFile: {},
  selectedFile: {},
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
    openFile: (state, action) => {
      const { id } = action.payload;
      const file = findFileById(state.structure, id);

      state.openedFile[id] = file;
      state.selectedFile = file;
    },
    updateSelectedFile: (state, action) => {
      const { id } = action.payload;
      const file = findFileById(state.structure, id);

      state.selectedFile = file;
    },
  },
});

export const {
  registeredUpdateFile,
  cancelUpdateFile,
  addFile,
  openFile,
  updateSelectedFile,
} = fileSlice.actions;

export default fileSlice.reducer;

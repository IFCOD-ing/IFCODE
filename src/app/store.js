import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import fileReducer from "../features/file/fileSlice";

export const store = configureStore({
  reducer: {
    file: fileReducer,
  },
  middleware: [logger],
});

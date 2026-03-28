// redux/project/projectSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { createProject } from "./projectThunk";

const initialState = {
  loading: false,
  project: null,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as never;
      });
  },
});

export default projectSlice.reducer;
// redux/project/projectThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProjectApi } from "../../Api/NewProjectApi";

export const createProject = createAsyncThunk(
  "project/createProject",
  async (payload: any, { rejectWithValue }) => {
    try {
      const data = await createProjectApi(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

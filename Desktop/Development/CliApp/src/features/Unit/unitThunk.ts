import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUnitApi, fetchUnitsApi } from "../../Api/NewUnitApi";

export const createUnit = createAsyncThunk(
  "unit/createUnit",
  async ({ projectId, payload }: { projectId: string; payload: any }, { rejectWithValue }) => {
    try {
      const data = await createUnitApi(projectId, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUnits = createAsyncThunk(
  "unit/fetchUnits",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const data = await fetchUnitsApi(projectId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
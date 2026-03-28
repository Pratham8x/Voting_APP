import { createSlice } from "@reduxjs/toolkit";
import { createUnit, fetchUnits } from "./unitThunk";

interface Unit {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  createdAt?: string;
}

interface UnitState {
  loading: boolean;
  units: Unit[];
  currentUnit: Unit | null;
  error: string | null;
}

const initialState: UnitState = {
  loading: false,
  units: [],
  currentUnit: null,
  error: null,
};

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    clearUnitError: (state) => {
      state.error = null;
    },
    clearUnits: (state) => {
      state.units = [];
      state.currentUnit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Unit
      .addCase(createUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.units = [action.payload, ...state.units];
        state.currentUnit = action.payload;
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Units
      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.units = action.payload;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUnitError, clearUnits } = unitSlice.actions;
export default unitSlice.reducer;
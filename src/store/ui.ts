import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UnitType } from "../lib/model";

export interface UIState {
  unitType: UnitType;
  progress: boolean;
  date?: string;
  error?: string;
}

export function createInitialState(): UIState {
  return {
    unitType: "metric",
    progress: false,
  };
}

const initialState: UIState = createInitialState();

const slice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    unitTypeUpdated: (state, action: PayloadAction<UnitType>) => {
      state.unitType = action.payload;
    },
    progressUpdated: (state, action: PayloadAction<boolean>) => {
      state.progress = action.payload;
    },
    dateUpdated: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
});

export const { unitTypeUpdated, progressUpdated, dateUpdated } = slice.actions;
export default slice.reducer;

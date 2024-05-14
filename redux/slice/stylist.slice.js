import { createSlice } from "@reduxjs/toolkit";

const stylistSlice = createSlice({
  name: "stylist",
  initialState: {
    stylistSchedule: [],
  },
  reducers: {
    setStylistSchedule: (state, action) => {
      state.stylistSchedule = action.payload;
    },
    removeStylistSchedule: (state) => {
      state.selectedStylist = [];
    },
  },
});

export const { setStylistSchedule, removeStylistSchedule } =
  stylistSlice.actions;

export const stylistScheduleState = (state) => state.stylist.stylistSchedule;

export default stylistSlice.reducer;

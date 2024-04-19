import { createSlice } from "@reduxjs/toolkit";

const discussionSlice = createSlice({
  name: "discussion",
  initialState: {
    selectedDiscussion: [],
  },
  reducers: {
    setSelectedDiscussion: (state, action) => {
      state.selectedDiscussion = action.payload;
    },
    removeSelectedDiscussion: (state) => {
      state.selectedDiscussion = [];
    },
  },
});

export const { setSelectedDiscussion, removeSelectedDiscussion } =
  discussionSlice.actions;

export const selectedDiscussionState = (state) =>
  state.discussion.selectedDiscussion;

export default discussionSlice.reducer;

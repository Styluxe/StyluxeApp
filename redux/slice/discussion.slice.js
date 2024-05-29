import { createSlice } from "@reduxjs/toolkit";

const discussionSlice = createSlice({
  name: "discussion",
  initialState: {
    selectedDiscussion: [],
    bookmarksData: [],
  },
  reducers: {
    setSelectedDiscussion: (state, action) => {
      state.selectedDiscussion = action.payload;
    },
    removeSelectedDiscussion: (state) => {
      state.selectedDiscussion = [];
    },
    setBookmarksData: (state, action) => {
      state.bookmarksData = action.payload;
    },
  },
});

export const {
  setSelectedDiscussion,
  removeSelectedDiscussion,
  setBookmarksData,
} = discussionSlice.actions;

export const selectedDiscussionState = (state) =>
  state.discussion.selectedDiscussion;

export const bookmarksDataState = (state) => state.discussion.bookmarksData;

export default discussionSlice.reducer;

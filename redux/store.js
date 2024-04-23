import { configureStore } from "@reduxjs/toolkit";

import discussionSlice from "./slice/discussion.slice";

const store = configureStore({
  reducer: {
    discussion: discussionSlice,
  },
});

export default store;

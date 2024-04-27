import { configureStore } from "@reduxjs/toolkit";

import appSlice from "./slice/app.slice";
import discussionSlice from "./slice/discussion.slice";

const store = configureStore({
  reducer: {
    discussion: discussionSlice,
    app: appSlice,
  },
});

export default store;

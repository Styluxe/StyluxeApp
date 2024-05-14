import { configureStore } from "@reduxjs/toolkit";

import appSlice from "./slice/app.slice";
import discussionSlice from "./slice/discussion.slice";
import stylistSlice from "./slice/stylist.slice";

const store = configureStore({
  reducer: {
    discussion: discussionSlice,
    app: appSlice,
    stylist: stylistSlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "../features/videos/videosSlice";
import filtersReducer from "../features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    filters: filtersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

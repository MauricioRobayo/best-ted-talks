import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "../features/videos/videosSlice";
import filtersReducer from "../features/filters/filtersSlice";
import channelsReducer from "../features/channels/channelsSlice";

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    filters: filtersReducer,
    channels: channelsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

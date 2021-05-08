import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Thumbnail } from "../youtubeAPI";
import fetchChannelsInfo from "./channelsAPI";

interface IInitialState {
  status: "idle" | "loading" | "resolved" | "rejected";
}

export interface IChannel {
  title: string;
  id: string;
  description: string;
  customUrl?: string;
  thumbnail: Thumbnail;
}

const channelsAdapter = createEntityAdapter<IChannel>();

export const fetchChannels = createAsyncThunk<IChannel[], string[]>(
  "channels/fetchChannels",
  async (ids) => {
    const channelsInfo = await fetchChannelsInfo(ids);
    return channelsInfo.items.map(({ id, snippet }) => ({
      id,
      title: snippet.title,
      description: snippet.description,
      customUrl: snippet.customUrl,
      thumbnail: snippet.thumbnails.medium,
    }));
  }
);

const channelsSlice = createSlice({
  name: "channels",
  initialState: channelsAdapter.getInitialState<IInitialState>({
    status: "idle",
  }),
  reducers: {
    channelsLoading(state) {
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action.payload);
        state.status = "idle";
      });
  },
});

export const {
  selectAll: selectChannels,
  selectIds: selectChannelsIds,
} = channelsAdapter.getSelectors((state: RootState) => state.channels);
export const selectChannelsStatus = (state: RootState) => state.channels.status;
export default channelsSlice.reducer;

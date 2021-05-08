import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { htmlUnescape } from "escape-goat";
import { RootState } from "../../app/store";
import { FilterType } from "../filters/filtersSlice";
import { fetchTedTopVideos, fetchVideoInfo, Thumbnail } from "./videosAPI";

export interface IVideo {
  commentCount: number;
  description: string;
  dislikeCount: number;
  duration: string;
  favoriteCount: number;
  id: string;
  likeCount: number;
  publishedAt: string;
  thumbnail: Thumbnail;
  title: string;
  viewCount: number;
  channelId: string;
}

const videosAdapter = createEntityAdapter<IVideo>({});

const channels = {
  TEDtalksDirector: "UCAuUUnT6oDeKwE6v1NGQxug",
  TEDxTalks: "UCsT0YIqwnpJCM-mx7-gSA4Q",
  TEDEducation: "UCsooa4yRKGN_zEE8iknghZA",
};

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (order: FilterType) => {
    try {
      const channelsVideos = await Promise.all(
        Object.values(channels).map((channelId) =>
          fetchTedTopVideos({ order, channelId, maxResults: 10 })
        )
      );

      const ids = channelsVideos
        .map((videos) => videos.items.map(({ id: { videoId } }) => videoId))
        .flat();

      const batchSize = 50;
      const idsBatches: string[][] = [];
      let idsBatch: string[] = [];
      ids.forEach((id) => {
        idsBatch.push(id);
        if (idsBatch.length === batchSize) {
          idsBatches.push(idsBatch);
          idsBatch = [];
        }
      });

      if (idsBatch.length !== 0) {
        idsBatches.push(idsBatch);
      }

      const videosInfoInBatches = await Promise.all(
        idsBatches.map((ids) => fetchVideoInfo(ids))
      );
      return videosInfoInBatches
        .map((videosInfoInBatch) =>
          videosInfoInBatch.items.map(
            ({ id, snippet, statistics, contentDetails }) => {
              return {
                id,
                title: htmlUnescape(snippet.title),
                channelId: snippet.channelId,
                description: snippet.description,
                thumbnail: snippet.thumbnails.default,
                publishedAt: snippet.publishedAt,
                viewCount: statistics.viewCount,
                likeCount: statistics.likeCount,
                dislikeCount: statistics.dislikeCount,
                commentCount: statistics.commentCount,
                duration: contentDetails.duration,
              };
            }
          )
        )
        .flat();
    } catch (e) {
      console.log(e);
    }
    return {};
  }
);

export const videosSlice = createSlice({
  name: "videos",
  initialState: videosAdapter.getInitialState({ status: "idle", channels }),
  reducers: {
    videosLoading(state) {
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        videosAdapter.setAll(state, action.payload);
        state.status = "idle";
      });
  },
});

export const {
  selectAll: selectVideos,
  selectById: selectVideoById,
} = videosAdapter.getSelectors((state: RootState) => state.videos);
export const selectStatus = (state: RootState) => state.videos.status;
export const selectChannels = (state: RootState) => state.videos.channels;

export const { videosLoading } = videosSlice.actions;

export default videosSlice.reducer;

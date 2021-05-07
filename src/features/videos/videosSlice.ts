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
}

const videosAdapter = createEntityAdapter<IVideo>({});

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (order: FilterType) => {
    try {
      const videos = await fetchTedTopVideos(order);
      const ids = videos.items.map(({ id: { videoId } }) => videoId);
      const videosInfo = await fetchVideoInfo(ids);
      return videosInfo.items.map(
        ({ id, snippet, statistics, contentDetails }) => {
          return {
            id,
            title: htmlUnescape(snippet.title),
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
      );
    } catch (e) {
      console.log(e);
    }
    return {};
  }
);

export const videosSlice = createSlice({
  name: "videos",
  initialState: videosAdapter.getInitialState({ status: "idle" }),
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

export const { videosLoading } = videosSlice.actions;

export default videosSlice.reducer;

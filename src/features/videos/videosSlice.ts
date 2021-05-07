import { htmlUnescape } from "escape-goat";
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchTedTopVideos, fetchVideoInfo, Thumbnail } from "./videosAPI";

export interface Video {
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

const videosAdapter = createEntityAdapter<Video>();

const initialState = videosAdapter.getInitialState({
  status: "idle",
});

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  try {
    const videos = await fetchTedTopVideos();
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
});

export const counterSlice = createSlice({
  name: "videos",
  initialState,
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

export const { selectAll: selectVideos } = videosAdapter.getSelectors(
  (state: RootState) => state.videos
);
export const selectStatus = (state: RootState) => state.videos.status;

export const { videosLoading } = counterSlice.actions;

export default counterSlice.reducer;

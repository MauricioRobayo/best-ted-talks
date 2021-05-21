import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { htmlUnescape } from "escape-goat";
import { RootState } from "../../app/store";
import { FilterType } from "../filters/filtersSlice";
import { fetchTedTopVideos, fetchVideoInfo } from "./videosAPI";
import { Thumbnail } from "../youtubeAPI";

export interface IVideo {
  commentCount: number;
  description: string;
  dislikeCount: number;
  duration: string;
  id: string;
  likeCount: number;
  publishedAt: string;
  thumbnail: Thumbnail;
  title: string;
  viewCount: number;
  channelId: string;
}

interface IInitialState {
  status: "idle" | "loading" | "resolved" | "rejected";
}

const videosAdapter = createEntityAdapter<IVideo>({});

export const fetchVideos = createAsyncThunk<
  IVideo[],
  {
    order: FilterType;
    channelsIds: string[];
  }
>("videos/fetchVideos", async ({ order, channelsIds }) => {
  const channelsVideos = await Promise.all(
    channelsIds.map((channelId) =>
      fetchTedTopVideos({ order, channelId, maxResults: 20 })
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
            thumbnail: snippet.thumbnails.medium,
            publishedAt: snippet.publishedAt,
            viewCount: Number(statistics.viewCount),
            likeCount: Number(statistics.likeCount),
            dislikeCount: Number(statistics.dislikeCount),
            commentCount: Number(statistics.commentCount),
            duration: contentDetails.duration,
          };
        }
      )
    )
    .flat();
});

export const videosSlice = createSlice({
  name: "videos",
  initialState: videosAdapter.getInitialState<IInitialState>({
    status: "idle",
  }),
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

export const { selectAll: selectVideos, selectById: selectVideoById } =
  videosAdapter.getSelectors((state: RootState) => state.videos);
export const selectVideosStatus = (state: RootState) => state.videos.status;

export default videosSlice.reducer;

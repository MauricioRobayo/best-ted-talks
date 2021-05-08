import { FilterType } from "../filters/filtersSlice";
import { fetchYouTube, SearchResult, VideoResult } from "../youtubeAPI";

export const fetchTedTopVideos = async ({
  order,
  channelId,
  maxResults,
}: {
  order: FilterType;
  channelId: string;
  maxResults: number;
}): Promise<{
  items: SearchResult[];
}> => {
  const endpoint = "search";
  const query = {
    channelId,
    maxResults: String(maxResults),
    order,
    part: "id",
    type: "video",
  };

  return fetchYouTube(endpoint, query);
};

export const fetchVideoInfo = async (
  ids: string[]
): Promise<{ items: VideoResult[] }> => {
  const endpoint = "videos";
  const query = {
    part: "statistics,contentDetails,snippet",
    id: ids.join(","),
  };
  return fetchYouTube(endpoint, query);
};

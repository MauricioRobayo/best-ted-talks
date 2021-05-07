const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyA0-OJjMtSqUqT_WgpOKf5bCyHIQUfQqDI";
const CHANNEL_ID = "UCAuUUnT6oDeKwE6v1NGQxug";

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface SearchResult {
  id: {
    videoId: string;
  };
}

interface VideoResult {
  id: string;
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    commentCount: number;
  };
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
    };
  };
  contentDetails: {
    duration: string;
  };
}

export const fetchTedTopVideos = async (): Promise<{
  items: SearchResult[];
}> => {
  const endpoint = "search";
  const query = {
    channelId: CHANNEL_ID,
    key: API_KEY,
    maxResults: "50",
    order: "rating",
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
    key: API_KEY,
    part: "statistics,contentDetails,snippet",
    id: ids.join(","),
  };
  return fetchYouTube(endpoint, query);
};

const fetchYouTube = async (
  endpoint: string,
  query: Record<string, string>
) => {
  const searchParams = new URLSearchParams(query);
  const result = await fetch(`${BASE_URL}/${endpoint}?${searchParams}`);
  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return result.json();
};

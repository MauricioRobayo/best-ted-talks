const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyA0-OJjMtSqUqT_WgpOKf5bCyHIQUfQqDI";

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type SearchResult = {
  id: {
    videoId: string;
  };
};

export type VideoResult = {
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
    channelId: string;
    thumbnails: {
      default: Thumbnail;
    };
  };
  contentDetails: {
    duration: string;
  };
};

export const fetchYouTube = async (
  endpoint: string,
  query: Record<string, string>
) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    ...query,
  });
  const result = await fetch(`${BASE_URL}/${endpoint}?${searchParams}`);
  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return result.json();
};

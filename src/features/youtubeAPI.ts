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
      medium: Thumbnail;
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
  const searchParams = new URLSearchParams(query);

  let baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:5001/best-ted-talks/us-central1/youtubeApi/"
      : "/youtube";

  const url = `${baseUrl}${endpoint}?${searchParams}`;
  const cache = JSON.parse(localStorage.getItem(url) || "{}");

  if (cache.cached && cache.cached > Date.now() - 60 * 60 * 1000) {
    return cache.data;
  }

  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(result.statusText);
  }

  const data = await result.json();
  localStorage.setItem(url, JSON.stringify({ data, cached: Date.now() }));
  return data;
};

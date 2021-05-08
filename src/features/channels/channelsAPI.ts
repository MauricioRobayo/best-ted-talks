import { fetchYouTube, Thumbnail } from "../youtubeAPI";

type ChannelResult = {
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    thumbnails: {
      medium: Thumbnail;
    };
  };
};

const fetchChannelsInfo = (
  ids: string[]
): Promise<{ items: ChannelResult[] }> => {
  const endpoint = "channels";
  const query = {
    part: "snippet",
    id: ids.join(","),
  };

  return fetchYouTube(endpoint, query);
};

export default fetchChannelsInfo;

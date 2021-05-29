import firebase from "firebase/app";
import "firebase/functions";

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

const firebaseConfig = {
  apiKey: "AIzaSyBxs9D6Bk25Rh6W5Rfb70GbaQAmwiNgEag",
  authDomain: "best-ted-talks.firebaseapp.com",
  projectId: "best-ted-talks",
  storageBucket: "best-ted-talks.appspot.com",
  messagingSenderId: "243738979789",
  appId: "1:243738979789:web:6cfec25cfdf68adb856884",
};

const app = firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "development") {
  app.functions().useEmulator("127.0.0.1", 5001);
}

export const fetchYouTube = async (
  endpoint: string,
  query: Record<string, string>
) => {
  const searchParams = new URLSearchParams(query);

  let baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:5001/best-ted-talks/us-central1/youtubeApi"
      : "/youtube";

  const url = `${baseUrl}/${endpoint}?${searchParams}`;
  const cache = JSON.parse(localStorage.getItem(url) || "{}");

  if (cache.cached && cache.cached > Date.now() - 60 * 60 * 1000) {
    return cache.data;
  }

  const youtubeApi = app.functions().httpsCallable("youtubeApi");
  const { data } = await youtubeApi({ endpoint, query });

  localStorage.setItem(url, JSON.stringify({ data, cached: Date.now() }));
  return data;
};

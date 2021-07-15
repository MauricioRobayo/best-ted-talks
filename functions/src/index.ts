import * as functions from "firebase-functions";
import axios from "axios";
import * as crypto from "crypto";
import * as admin from "firebase-admin";

const firebaseConfig = {
  apiKey: "AIzaSyBxs9D6Bk25Rh6W5Rfb70GbaQAmwiNgEag",
  authDomain: "best-ted-talks.firebaseapp.com",
  projectId: "best-ted-talks",
  storageBucket: "best-ted-talks.appspot.com",
  messagingSenderId: "243738979789",
  appId: "1:243738979789:web:6cfec25cfdf68adb856884",
  databaseURL: "https://best-of-ted.firebaseio.com",
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

const baseUrl = "https://www.googleapis.com/youtube/v3";
const youtubeApiKey = functions.config().youtube?.key;

if (!youtubeApiKey) {
  throw new Error("No youtube api key found!");
}

export const youtubeApi = functions.https.onCall(
  async (
    {endpoint, query}: {endpoint: string; query: Record<string, string>},
    context
  ) => {
    // if (context.app === undefined) {
    //   throw new functions.https.HttpsError(
    //     "failed-precondition",
    //     "The function must be called from an App Check verified app."
    //   );
    // }

    const searchParams = new URLSearchParams({...query, key: youtubeApiKey});
    const url = `${baseUrl}/${endpoint}?${searchParams}`;
    const hash = crypto.createHash("md5").update(url).digest("hex");
    const doc = db.collection("cache").doc(hash);
    const cache = await doc.get();
    const cachedData = cache.data();

    if (cachedData && cachedData.cached > Date.now() - 60 * 60 * 1000) {
      return cachedData.data;
    }
    const {data} = await axios.get(url, {
      headers: {
        referer: context.rawRequest.headers.origin,
      },
    });
    doc.set({
      cached: Date.now(),
      data,
      url,
    });
    return data;
  }
);

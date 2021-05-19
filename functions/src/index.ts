import * as functions from "firebase-functions";
import axios from "axios";
import * as crypto from "crypto";
import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://best-of-ted.firebaseio.com",
});

const db = admin.firestore();

const baseUrl = "https://www.googleapis.com/youtube/v3";
const youtubeApiKey = functions.config().youtube?.key;
const localPath = "youtube";

if (!youtubeApiKey) {
  throw new Error("No youtube api key found!");
}

export const youtubeApi = functions.https.onRequest(async (req, res) => {
  res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
  if (process.env.FUNCTIONS_EMULATOR) {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  }

  try {
    const originalUrl = req.originalUrl.replace(`/${localPath}`, "");

    const hash = crypto.createHash("md5").update(originalUrl).digest("hex");
    const doc = db.collection("cache").doc(hash);
    const cache = await doc.get();
    const data = cache.data();

    if (data && data.cached > Date.now() - 60 * 60 * 1000) {
      res.set("X-Cache-Status", "HIT").json(data.data);
      return;
    }
    const response = await axios.get(
      `${baseUrl}${originalUrl}&key=${youtubeApiKey}`,
      {
        headers: {
          referer: req.headers.referer,
        },
      }
    );
    doc.set({
      cached: Date.now(),
      data: response.data,
      originalUrl,
    });
    res.set("X-Cache-Status", "MISS").json(response.data);
  } catch (error) {
    functions.logger.error(
      `youtubeApi function error: ${JSON.stringify(error)}`
    );
    if (error.response) {
      const {status, statusText} = error.response;
      res.status(status).json({
        status,
        statusText,
      });
      return;
    }
    res.status(500).json(error);
  }
});

import React from "react";
import { IVideo } from "./videosSlice";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const VideoCard = ({
  commentCount,
  dislikeCount,
  id,
  likeCount,
  publishedAt,
  thumbnail,
  title,
  viewCount,
  duration,
}: IVideo) => {
  const formattedDuration = duration
    .replace(/[pts]/gi, "")
    .split(/[hm]/i)
    .map((part) => part.padStart(2, "0"))
    .join(":");
  const publishedDate = new Date(publishedAt);
  const distanceToNow = formatDistanceToNow(publishedDate);
  const videoPath = `/t/${id}`;

  return (
    <article>
      <Link to={videoPath}>
        <img alt={title} src={thumbnail.url} title={title} />
      </Link>
      <footer>
        <div>{distanceToNow}</div>
        <Link to={videoPath}>{title}</Link>
        <div>
          <FiThumbsUp /> {likeCount}
        </div>
        <div>
          <FiThumbsDown /> {dislikeCount}
        </div>
        <div>comments: {commentCount}</div>
        <div>views: {viewCount}</div>
        <div>human duration {formattedDuration}</div>
      </footer>
    </article>
  );
};

export default VideoCard;

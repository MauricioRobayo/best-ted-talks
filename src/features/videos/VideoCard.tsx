import React from "react";
import { Video } from "./videosSlice";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import styled from "styled-components";

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
}: Video) => {
  const formattedDuration = duration
    .replace(/[pts]/gi, "")
    .split(/[hm]/i)
    .map((part) => part.padStart(2, "0"))
    .join(":");

  return (
    <article>
      <a href={`https://www.youtube.com/watch?v=${id}`}>
        <img alt={title} src={thumbnail.url} title={title} />
      </a>
      <footer>
        <div>publishedAt {publishedAt}</div>
        <a href={`https://www.youtube.com/watch?v=${id}`}>{title}</a>
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

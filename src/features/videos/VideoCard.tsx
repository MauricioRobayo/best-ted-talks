import React from "react";
import { IVideo } from "./videosSlice";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import VideoDescription from "./VideoDescription";

const Thumbnail = styled.div`
  position: relative;
  img {
    object-fit: cover;
    width: 100%;
    height: 135px;
  }
`;

const Duration = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.25rem;
  padding: 0.15em 0.25em;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  font-size: 0.75rem;
`;

const StyledVideoCard = styled.div`
  width: 240px;
  overflow: hidden;
`;

type VideoCardProps = {
  className?: string;
  video: IVideo;
};

const VideoCard = ({ className, video }: VideoCardProps) => {
  const { id, thumbnail, title, duration } = video;
  const formattedDuration = duration
    .replace(/[pts]/gi, "")
    .split(/[hm]/i)
    .map((part) => part.padStart(2, "0"))
    .join(":");
  const videoPath = `/t/${id}`;

  return (
    <StyledVideoCard className={className}>
      <Thumbnail>
        <Link to={videoPath}>
          <img alt={title} src={thumbnail.url} title={title} loading="lazy" />
        </Link>
        <Duration>{formattedDuration}</Duration>
      </Thumbnail>
      <VideoDescription video={video} />
    </StyledVideoCard>
  );
};

export default VideoCard;

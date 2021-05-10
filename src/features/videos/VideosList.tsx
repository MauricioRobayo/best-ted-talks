import React, { useMemo } from "react";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import styled from "styled-components";
import VideoCard from "./VideoCard";
import { selectVideos, selectVideosStatus } from "./videosSlice";

const VideosWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

type VideoListProps = {
  channelId: string;
};

const VideosList = ({ channelId }: VideoListProps) => {
  const videos = useSelector(selectVideos);
  const videosStatus = useSelector(selectVideosStatus);

  const channelVideos = useMemo(
    () => videos.filter((video) => video.channelId === channelId),
    [videos, channelId]
  );

  return (
    <div>
      {videosStatus === "loading" ? (
        <Loader
          type="Grid"
          color="#E62B1E"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <VideosWrapper>
          {channelVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </VideosWrapper>
      )}
    </div>
  );
};

export default VideosList;

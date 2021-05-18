import React, { useMemo } from "react";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import styled from "styled-components";
import defaultTheme from "../../theme";
import VideoCard from "./VideoCard";
import { selectVideos, selectVideosStatus } from "./videosSlice";

const VideosWrapper = styled.div`
  padding-bottom: 1rem;
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-behavior: smooth;
  gap: 1rem;
  width: 100%;
`;

const StyledVideoCard = styled(VideoCard)`
  flex-shrink: 0;
  scroll-snap-align: start;
`;

type VideoListProps = {
  channelId: string;
};

const VideoListWrapper = styled.div``;

const VideosList = ({ channelId }: VideoListProps) => {
  const videos = useSelector(selectVideos);
  const videosStatus = useSelector(selectVideosStatus);

  const channelVideos = useMemo(
    () => videos.filter((video) => video.channelId === channelId),
    [videos, channelId]
  );

  return (
    <VideoListWrapper>
      {videosStatus === "loading" ? (
        <Loader
          type="Grid"
          color={defaultTheme.colors.ted}
          height={100}
          width={100}
          timeout={3000}
        />
      ) : (
        <VideosWrapper>
          {channelVideos.map((video) => (
            <StyledVideoCard key={video.id} {...video} />
          ))}
        </VideosWrapper>
      )}
    </VideoListWrapper>
  );
};

export default VideosList;

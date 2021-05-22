import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import VideoDescription from "./VideoDescription";
import { fetchVideo, selectVideoById } from "./videosSlice";
import AppLoader from "../../components/AppLoader";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Wrapper = styled.div`
  display: grid;
  max-width: 560px;
  margin: auto;
`;

const BackButton = styled.div`
  font-weight: 700;
  margin-bottom: 1rem;
`;

const IframeWrapper = styled.div`
  place-self: center;
  overflow: hidden;
  position: relative;
  width: 100%;
  &::after {
    padding-top: 56.25%;
    display: block;
    content: "";
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

interface MatchParams {
  videoId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Video = ({ match }: Props) => {
  const { videoId } = match.params;
  const video = useAppSelector((state) => selectVideoById(state, videoId));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!video) {
      dispatch(fetchVideo(videoId));
    }
  }, [video, videoId, dispatch]);

  return (
    <Wrapper>
      <BackButton>
        <Link to="/">❮ Back</Link>
      </BackButton>
      <IframeWrapper>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </IframeWrapper>
      {video ? (
        <VideoDescription video={video} />
      ) : (
        <AppLoader height={50} width={50} />
      )}
    </Wrapper>
  );
};

export default Video;

import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../app/store";
import VideoDescription from "./VideoDescription";
import { selectVideoById } from "./videosSlice";

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
`;

interface MatchParams {
  videoId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Video = ({ match }: Props) => {
  const { videoId } = match.params;
  const video = useSelector((state: RootState) =>
    selectVideoById(state, videoId)
  );

  if (!video) {
    return null;
  }

  return (
    <Wrapper>
      <BackButton>
        <Link to="/">❮ Back</Link>
      </BackButton>
      <IframeWrapper>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </IframeWrapper>
      <VideoDescription video={video} />
    </Wrapper>
  );
};

export default Video;

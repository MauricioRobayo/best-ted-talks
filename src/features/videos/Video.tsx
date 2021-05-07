import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { RootState } from "../../app/store";
import { selectVideoById } from "./videosSlice";

interface MatchParams {
  videoId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Video = ({ match }: Props) => {
  const { videoId } = match.params;
  const video = useSelector((state: RootState) =>
    selectVideoById(state, videoId)
  );

  console.log({ video });

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;

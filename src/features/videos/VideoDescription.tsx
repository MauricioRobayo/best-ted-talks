import React from "react";
import { format } from "date-fns";
import { channelsMetaInfo } from "../../config";
import { IVideo } from "./videosSlice";
import { FiThumbsUp, FiThumbsDown, FiEye } from "react-icons/fi";
import { FaRegCommentDots, FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const Footer = styled.footer`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  p {
    margin: 0;
    display: flex;
    gap: 0.25em;
    align-items: center;
  }
  & > div {
    display: flex;
    gap: 0.5rem;
  }
`;

const Title = styled.h4`
  margin: 0.5rem 0 0.25rem;
  a {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const Author = styled.div`
  margin: 0 0 0.5rem;
`;

type VideoDescriptionProps = {
  video: IVideo;
};
const VideoDescription = ({ video }: VideoDescriptionProps) => {
  const {
    publishedAt,
    likeCount,
    dislikeCount,
    commentCount,
    viewCount,
    title,
    channelId,
    id,
  } = video;
  const publishedDate = format(new Date(publishedAt), "MMMM yyyy");
  const formattedLikeCount = new Intl.NumberFormat().format(likeCount);
  const formattedDislikeCount = new Intl.NumberFormat().format(dislikeCount);
  const formattedCommentCount = new Intl.NumberFormat().format(commentCount);
  const formattedViewCount = new Intl.NumberFormat().format(viewCount);
  const [talkTitle, talkSpeaker] = title.split(
    channelsMetaInfo[channelId].titleDivider
  );
  const videoPath = `/t/${id}`;

  return (
    <>
      <Title>
        <Link to={videoPath}>{talkTitle.trim()}</Link>
      </Title>
      {talkSpeaker ? <Author>{talkSpeaker.trim()}</Author> : null}

      <Footer>
        <p>
          <FaRegCalendarAlt /> {publishedDate}
        </p>
        <div>
          <p>
            <FiEye /> {formattedViewCount}
          </p>
          <p>
            <FaRegCommentDots /> {formattedCommentCount}
          </p>
        </div>
        <div>
          <p>
            <FiThumbsUp /> {formattedLikeCount}
          </p>
          <p>
            <FiThumbsDown /> {formattedDislikeCount}
          </p>
        </div>
      </Footer>
    </>
  );
};

export default VideoDescription;

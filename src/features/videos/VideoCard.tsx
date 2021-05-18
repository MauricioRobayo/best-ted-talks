import React from "react";
import { IVideo } from "./videosSlice";
import { FiThumbsUp, FiThumbsDown, FiEye } from "react-icons/fi";
import { FaRegCommentDots, FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { channelsMetaInfo } from "../../config";

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

const Footer = styled.footer`
  font-size: 0.75rem;
  color: #666;
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
  margin: 0.5rem 0 0;
  a {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const StyledVideoCard = styled.div`
  width: 240px;
  overflow: hidden;
`;

const Author = styled.div`
  margin: 0.25rem 0 0.5rem;
`;

type VideoCardProps = {
  className?: string;
} & IVideo;

const VideoCard = ({
  commentCount,
  className,
  dislikeCount,
  id,
  likeCount,
  publishedAt,
  thumbnail,
  title,
  viewCount,
  duration,
  channelId,
}: VideoCardProps) => {
  const formattedDuration = duration
    .replace(/[pts]/gi, "")
    .split(/[hm]/i)
    .map((part) => part.padStart(2, "0"))
    .join(":");
  const publishedDate = format(new Date(publishedAt), "MMMM yyyy");
  const videoPath = `/t/${id}`;
  const formattedLikeCount = new Intl.NumberFormat().format(likeCount);
  const formattedDislikeCount = new Intl.NumberFormat().format(dislikeCount);
  const formattedCommentCount = new Intl.NumberFormat().format(commentCount);
  const formattedViewCount = new Intl.NumberFormat().format(viewCount);
  console.log(
    channelsMetaInfo[channelId].titleDivider,
    title.split(channelsMetaInfo[channelId].titleDivider)
  );
  const [talkTitle, talkSpeaker] = title.split(
    channelsMetaInfo[channelId].titleDivider
  );

  return (
    <StyledVideoCard className={className}>
      <Thumbnail>
        <Link to={videoPath}>
          <img alt={title} src={thumbnail.url} title={title} />
        </Link>
        <Duration>{formattedDuration}</Duration>
      </Thumbnail>
      <Title>
        <Link to={videoPath}>{talkTitle.trim()}</Link>
      </Title>
      <Author>{talkSpeaker.trim()}</Author>
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
    </StyledVideoCard>
  );
};

export default VideoCard;

import React from "react";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import VideosList from "../videos/VideosList";
import Channel from "./Channel";
import { selectChannels, selectChannelsStatus } from "./channelsSlice";
import defaultTheme from "../../theme";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledLoader = styled(Loader)`
  margin-top: 2rem;
`;

const ChannelsList = () => {
  const channels = useSelector(selectChannels);
  const channelsStatus = useSelector(selectChannelsStatus);

  return (
    <Wrapper>
      {channelsStatus === "loading" ? (
        <StyledLoader
          type="Grid"
          color={defaultTheme.colors.ted}
          height={100}
          width={100}
        />
      ) : (
        channels.map((channel) => (
          <Channel key={channel.id} {...channel}>
            <VideosList channelId={channel.id} />
          </Channel>
        ))
      )}
    </Wrapper>
  );
};

export default ChannelsList;

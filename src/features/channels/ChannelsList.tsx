import React, { useEffect } from "react";
import AppLoader from "../../components/AppLoader";
import VideosList from "../videos/VideosList";
import Channel from "./Channel";
import { selectChannels, selectChannelsStatus } from "./channelsSlice";
import styled from "styled-components/macro";
import Filters from "../filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { channelsIds } from "../../config";
import { fetchChannels } from "./channelsSlice";
import { selectActiveFilter } from "../../features/filters/filtersSlice";
import { fetchVideos } from "../../features/videos/videosSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledLoader = styled(AppLoader)`
  margin: auto;
  align-self: center;
  justify-self: center;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  @media only screen and (min-width: 520px) {
    flex-direction: row;
  }
`;

const ChannelsList = () => {
  const channels = useSelector(selectChannels);
  const channelsStatus = useSelector(selectChannelsStatus);

  const dispatch = useDispatch();
  const activeFilter = useSelector(selectActiveFilter);
  useEffect(() => {
    dispatch(fetchVideos({ order: activeFilter, channelsIds }));
  }, [dispatch, activeFilter]);

  useEffect(() => {
    dispatch(fetchChannels(channelsIds));
  }, [dispatch]);

  return (
    <>
      <Nav>
        <Filters />
      </Nav>
      <Wrapper>
        {channelsStatus === "loading" ? (
          <StyledLoader height={100} width={100} />
        ) : (
          channels.map((channel) => (
            <Channel key={channel.id} {...channel}>
              <VideosList channelId={channel.id} />
            </Channel>
          ))
        )}
      </Wrapper>
    </>
  );
};

export default ChannelsList;

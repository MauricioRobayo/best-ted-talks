import React from "react";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import VideosList from "../videos/VideosList";
import Channel from "./Channel";
import { selectChannels, selectChannelsStatus } from "./channelsSlice";
import themes from "../../theme";
import styled from "styled-components/macro";
import {
  filtersNames,
  selectActiveFilter,
  selectFilters,
  updateFilter,
} from "../../features/filters/filtersSlice";
import usePrefersColorScheme from "../../hooks/usePrefersColorScheme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledLoader = styled(Loader)`
  margin: auto;
  align-self: center;
  justify-self: center;
`;

type ButtonProps = {
  active: boolean;
};
const Button = styled.button<ButtonProps>`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.ted : theme.colors.background};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.ted)};
  font-weight: ${({ active }) => (active ? "900" : "700")};
  padding: 0.5em 1em;
  border: ${({ theme }) => `2px solid ${theme.colors.ted}`};
  cursor: ${({ active }) => (active ? "inherit" : "pointer")};
  border-radius: 0.5rem;
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
  const filters = useSelector(selectFilters);
  const activeFilter = useSelector(selectActiveFilter);
  const preferredColorScheme = usePrefersColorScheme();
  const dispatch = useDispatch();

  return (
    <>
      <Nav>
        {filters.map((filter) => (
          <Button
            active={filter === activeFilter}
            disabled={filter === activeFilter}
            key={filter}
            onClick={() => dispatch(updateFilter(filter))}
            type="button"
          >
            {filtersNames[filter]}
          </Button>
        ))}
      </Nav>
      <Wrapper>
        {channelsStatus === "loading" ? (
          <StyledLoader
            type="Grid"
            color={themes[preferredColorScheme].colors.ted}
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
    </>
  );
};

export default ChannelsList;

import React, { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { Normalize } from "styled-normalize";
import { channelsIds } from "./config";
import ChannelsList from "./features/channels/ChannelsList";
import { fetchChannels } from "./features/channels/channelsSlice";
import {
  filtersNames,
  selectActiveFilter,
  selectFilters,
  updateFilter,
} from "./features/filters/filtersSlice";
import Video from "./features/videos/Video";
import { fetchVideos } from "./features/videos/videosSlice";
import GlobalStyle from "./globalStyles";
import { ThemeProvider } from "styled-components";
import defaultTheme from "./theme";

const Header = styled.header`
  text-align: center;
`;

const Title = styled.h1`
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 0;
`;

const Ted = styled.span`
  color: ${({ theme }) => theme.colors.ted};
  font-weight: 900;
  letter-spacing: -2px;
  text-transform: uppercase;
`;

type ButtonProps = {
  active: boolean;
};
const Button = styled.button<ButtonProps>`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.ted : "white"};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.ted)};
  font-weight: ${({ active }) => (active ? "900" : "700")};
  padding: 0.5em 1em;
  border: ${({ active, theme }) =>
    active ? "none" : `2px solid ${theme.colors.ted}`};
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

const Main = styled.main`
  padding: 1rem;
`;

function App() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const activeFilter = useSelector(selectActiveFilter);

  useEffect(() => {
    dispatch(fetchVideos({ order: activeFilter, channelsIds }));
  }, [dispatch, activeFilter]);

  useEffect(() => {
    dispatch(fetchChannels(channelsIds));
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <Normalize />
        <GlobalStyle />
        <Header>
          <Title>
            Best <Ted>Ted</Ted> Talks
          </Title>
        </Header>
        <Main>
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
          <Route exact={true} path="/" component={ChannelsList} />
          <Route path="/t/:videoId" component={Video} />
        </Main>
      </ThemeProvider>
    </Router>
  );
}

export default App;

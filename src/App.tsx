import React, { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components/macro";
import { Normalize } from "styled-normalize";
import { channelsIds } from "./config";
import ChannelsList from "./features/channels/ChannelsList";
import { fetchChannels } from "./features/channels/channelsSlice";
import { selectActiveFilter } from "./features/filters/filtersSlice";
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

const Main = styled.main`
  padding: 1rem;
`;

function App() {
  const dispatch = useDispatch();
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
          <Route exact={true} path="/" component={ChannelsList} />
          <Route path="/t/:videoId" component={Video} />
        </Main>
      </ThemeProvider>
    </Router>
  );
}

export default App;

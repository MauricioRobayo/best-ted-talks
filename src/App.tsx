import React, { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { Normalize } from "styled-normalize";
import { channelsIds } from "./config";
import ChannelsList from "./features/channels/ChannelsList";
import { fetchChannels } from "./features/channels/channelsSlice";
import { selectActiveFilter } from "./features/filters/filtersSlice";
import Video from "./features/videos/Video";
import { fetchVideos } from "./features/videos/videosSlice";
import GlobalStyle from "./globalStyles";
import { css, ThemeProvider } from "styled-components";
import themes from "./theme";
import usePrefersColorScheme from "./hooks/usePrefersColorScheme";

const Header = styled.header`
  text-align: center;
`;

const Title = styled.h1`
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 0;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Ted = styled.span`
  color: ${({ theme }) => theme.colors.ted};
  font-weight: 900;
  letter-spacing: -2px;
  text-transform: uppercase;
`;

type MainProps = {
  home: boolean;
};
const Main = styled.main<MainProps>`
  padding: 1rem;
  flex: 1;
  ${({ home }) =>
    home &&
    css`
      display: flex;
      flex-direction: column;
    `}
`;

const Footer = styled.footer`
  padding: 1rem 0;
  text-align: center;
`;

function App() {
  const dispatch = useDispatch();
  const activeFilter = useSelector(selectActiveFilter);
  const location = useLocation();

  const preferredColorScheme = usePrefersColorScheme();

  useEffect(() => {
    dispatch(fetchVideos({ order: activeFilter, channelsIds }));
  }, [dispatch, activeFilter]);

  useEffect(() => {
    dispatch(fetchChannels(channelsIds));
  }, [dispatch]);

  return (
    <ThemeProvider theme={themes[preferredColorScheme]}>
      <Normalize />
      <GlobalStyle />
      <Wrapper>
        <Header>
          <Title>
            Best <Ted>Ted</Ted> Talks
          </Title>
        </Header>
        <Main home={location.pathname === "/"}>
          <Route exact={true} path="/" component={ChannelsList} />
          <Route path="/t/:videoId" component={Video} />
        </Main>
        <Footer>
          View on{" "}
          <a href="https://github.com/MauricioRobayo/best-ted-talks">Github.</a>
        </Footer>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

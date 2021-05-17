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
  selectActiveFilter,
  selectFilters,
} from "./features/filters/filtersSlice";
import Video from "./features/videos/Video";
import { fetchVideos } from "./features/videos/videosSlice";
import GlobalStyle from "./globalStyles";

const Header = styled.header`
  text-align: center;
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
      <Normalize />
      <GlobalStyle />
      <Header>
        <h1>Best of Ted</h1>
      </Header>
      <main>
        <nav>
          {filters.map((filter) => (
            <button key={filter} type="button">
              {filter}
            </button>
          ))}
        </nav>
        <Route exact={true} path="/" component={ChannelsList} />
        <Route path="/t/:videoId" component={Video} />
      </main>
    </Router>
  );
}

export default App;

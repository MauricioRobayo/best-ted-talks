import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { Normalize } from "styled-normalize";
import Video from "./features/videos/Video";
import VideosList from "./features/videos/VideosList";
import GlobalStyle from "./globalStyles";

const Header = styled.header`
  text-align: center;
`;

function App() {
  return (
    <Router>
      <Normalize />
      <GlobalStyle />
      <Header>
        <h1>Best of Ted</h1>
      </Header>
      <main>
        <Route exact={true} path="/" component={VideosList} />
        <Route path="/t/:videoId" component={Video} />
      </main>
    </Router>
  );
}

export default App;

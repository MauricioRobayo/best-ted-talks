import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import GlobalStyle from "./globalStyles";
import { Normalize } from "styled-normalize";
import VideosList from "./features/videos/VideosList";
import Video from "./features/videos/Video";

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

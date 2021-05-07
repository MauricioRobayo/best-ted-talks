import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "./features/videos/VideoCard";
import { selectStatus, selectVideos } from "./features/videos/videosSlice";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import GlobalStyle from "./globalStyles";
import { Normalize } from "styled-normalize";
import styled from "styled-components";

const Header = styled.header`
  text-align: center;
`;
const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
`;

function App() {
  const videos = useSelector(selectVideos);
  const status = useSelector(selectStatus);

  console.log({ videos, status });

  return (
    <>
      <Normalize />
      <GlobalStyle />
      <Header>
        <h1>Best of Ted</h1>
      </Header>
      {status === "loading" ? (
        <Loader
          type="Grid"
          color="#E62B1E"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <Main>
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </Main>
      )}
    </>
  );
}

export default App;

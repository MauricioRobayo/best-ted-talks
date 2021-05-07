import React, { useEffect } from "react";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  FilterType,
  selectActiveFilter,
  selectFilters,
  updateFilter,
} from "../filters/filtersSlice";
import VideoCard from "./VideoCard";
import { fetchVideos, selectStatus, selectVideos } from "./videosSlice";

const VideosWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

const VideosList = () => {
  const videos = useSelector(selectVideos);
  const status = useSelector(selectStatus);
  const filters = useSelector(selectFilters);
  const activeFilter = useSelector(selectActiveFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideos(activeFilter));
  }, [dispatch, activeFilter]);

  const setFilter = (filter: FilterType) => {
    dispatch(updateFilter(filter));
  };

  return (
    <>
      <nav>
        {filters.map((filter) => (
          <button key={filter} onClick={() => setFilter(filter)} type="button">
            {filter}
          </button>
        ))}
      </nav>
      <VideosWrapper>
        {status === "loading" ? (
          <Loader
            type="Grid"
            color="#E62B1E"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
          videos.map((video) => <VideoCard key={video.id} {...video} />)
        )}
      </VideosWrapper>
    </>
  );
};

export default VideosList;

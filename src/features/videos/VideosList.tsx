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
import { fetchVideos, selectVideosStatus, selectVideos } from "./videosSlice";
import {
  fetchChannels,
  selectChannels,
  selectChannelsStatus,
} from "../channels/channelsSlice";

const VideosWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

const channelsIds = [
  "UCAuUUnT6oDeKwE6v1NGQxug", // TEDtalksDirector
  "UCsT0YIqwnpJCM-mx7-gSA4Q", // TEDxTalks
  "UCsooa4yRKGN_zEE8iknghZA", // TEDEducation
];

const VideosList = () => {
  const videos = useSelector(selectVideos);
  const videosStatus = useSelector(selectVideosStatus);
  const channelsStatus = useSelector(selectChannelsStatus);
  const filters = useSelector(selectFilters);
  const activeFilter = useSelector(selectActiveFilter);
  const channels = useSelector(selectChannels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideos({ order: activeFilter, channelsIds }));
  }, [dispatch, activeFilter]);

  useEffect(() => {
    dispatch(fetchChannels(channelsIds));
  }, [dispatch]);

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
      <div>
        {videosStatus === "loading" || channelsStatus === "loading" ? (
          <Loader
            type="Grid"
            color="#E62B1E"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
          channels.map(({ title, id }) => {
            return (
              <section key={id}>
                <h2>{title}</h2>
                <VideosWrapper>
                  {videos
                    .filter(({ channelId }) => channelId === id)
                    .map((video) => (
                      <VideoCard key={video.id} {...video} />
                    ))}
                </VideosWrapper>
              </section>
            );
          })
        )}
      </div>
    </>
  );
};

export default VideosList;

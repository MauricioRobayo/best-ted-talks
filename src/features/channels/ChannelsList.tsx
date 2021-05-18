import React from "react";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import VideosList from "../videos/VideosList";
import Channel from "./Channel";
import { selectChannels, selectChannelsStatus } from "./channelsSlice";
import defaultTheme from "../../theme";

const ChannelsList = () => {
  const channels = useSelector(selectChannels);
  const channelsStatus = useSelector(selectChannelsStatus);

  return (
    <div>
      {channelsStatus === "loading" ? (
        <Loader
          type="Grid"
          color={defaultTheme.colors.ted}
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        channels.map((channel) => (
          <Channel key={channel.id} {...channel}>
            <VideosList channelId={channel.id} />
          </Channel>
        ))
      )}
    </div>
  );
};

export default ChannelsList;

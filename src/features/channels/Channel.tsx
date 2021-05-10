import React, { ReactNode } from "react";
import { IChannel } from "./channelsSlice";

type ChannelProps = {
  children: ReactNode;
} & IChannel;

const Channel = ({ children, title, customUrl, thumbnail }: ChannelProps) => {
  return (
    <section>
      <h2>
        <a href={customUrl}>
          <img src={thumbnail.url} alt={title} />
        </a>
      </h2>
      <div>{children}</div>
    </section>
  );
};

export default Channel;

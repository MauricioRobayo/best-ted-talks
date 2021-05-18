import React, { ReactNode } from "react";
import styled from "styled-components";
import { IChannel } from "./channelsSlice";

const Title = styled.h2`
  a {
    text-decoration: none;
  }
`;

type ChannelProps = {
  children: ReactNode;
} & IChannel;

const Channel = ({ children, title, customUrl }: ChannelProps) => {
  return (
    <section>
      <Title>
        <a href={`https://www.youtube.com/${customUrl}`}>{title}</a>
      </Title>
      <div>{children}</div>
    </section>
  );
};

export default Channel;

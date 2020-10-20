import React from "react";
import styled from "styled-components";
import { ChatRoom } from "./ChatRoom";
import { SendMessage } from "./SendMessage";

export const Chat = () => {
  return (
    <Container>
      <ChatRoom />
      <SendMessage />
    </Container>
  );
};

const Container = styled.div`
  grid-area: chat;
  display: grid;
  grid-template-rows: 1fr minmax(52px, auto);
`;

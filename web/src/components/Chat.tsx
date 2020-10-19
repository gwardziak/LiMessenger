import React from "react";
import styled from "styled-components";
import Scrollbar from "../utils/Scrollbar";
import { ChatRoom } from "./ChatRoom";
import { SendMessage } from "./SendMessage";

export const Chat = () => {
  return (
    <StyledScrollbar>
      <Container>
        <ChatRoom />
        <SendMessage />
      </Container>
    </StyledScrollbar>
  );
};
//
//
const Container = styled.div`
  grid-area: chat;
  display: grid;
  grid-template-rows: 1fr 52px;
`;

const StyledScrollbar = styled(Scrollbar)`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

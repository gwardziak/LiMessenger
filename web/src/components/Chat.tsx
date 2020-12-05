import React, { useState } from "react";
import styled from "styled-components";
import { ChatRoom } from "./ChatRoom";
import { SendMessage } from "./SendMessage";

export const Chat = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  return (
    <Container>
      <ChatRoom isScrolled={isScrolled} setIsScrolled={setIsScrolled} />
      <SendMessage setIsScrolled={setIsScrolled} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: chat;
  display: grid;
  grid-template-rows: 1fr minmax(52px, auto);
`;

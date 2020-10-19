import React from "react";
import styled from "styled-components";
import { Chat } from "../components/Chat";
import { ChatRoomOptions } from "../components/ChatRoomOptions";
import { FriendList } from "../components/FriendList";
import { Navbar } from "../components/Navbar";
import { UserOptions } from "../components/UserOptions";
import { mediaQuery } from "../utils/css/cssMedia";

export const Main = () => {
  const users = [1, 2, 3, 4, 5, 5, 6];

  return (
    <Container>
      <Navbar />
      <UserOptions />
      <FriendList />
      <Chat />
      <ChatRoomOptions />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 60px 1fr;

  grid-template-areas:
    "userOptions nav nav"
    "friendList chat chatRoomOptions
  ";

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    grid-template-columns: 80px 2fr 1fr;
  }
`;

import React from "react";
import styled from "styled-components";
import { Chat } from "../components/Chat";
import { ChatRoomOptions } from "../components/ChatRoomOptions";
import { FriendList } from "../components/FriendList";
import { Navbar } from "../components/Navbar";
import { UserOptions } from "../components/UserOptions";
import { mediaQuery } from "../utils/css/cssMedia";
import { useChatroomSubscription } from "./../generated/graphql";

export const Main = () => {
  const [{ data, error, fetching }] = useChatroomSubscription({
    variables: {
      topic:
        "2bd70856-21c8-4065-b68a-c6e4d762dc1d14610c8f-7d64-496d-afe3-3530de69d27e",
    },
  });

  console.log(data);
  console.log(error);
  console.log(fetching);

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

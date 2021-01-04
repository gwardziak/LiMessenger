import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Chat } from "../components/Chat";
import { ChatRoomOptions } from "../components/ChatRoomOptions";
import { Navbar } from "../components/Navbar";
import { UserOptions } from "../components/UserOptions";
import { useRootStore } from "../stores/RootStore";
import { mediaQuery } from "../utils/css/cssMedia";
import { FriendList } from "./../components/FriendList";

export const Main = observer(() => {
  const rootStore = useRootStore();

  useEffect(() => {
    rootStore.userStore.fetchUser();
    rootStore.chatStore.subscribeAndFetch();
  }, [rootStore]);

  return (
    <Container>
      <Navbar />
      <UserOptions />
      <FriendList />
      <Chat />
      <ChatRoomOptions />
    </Container>
  );
});

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 60px 1fr;

  grid-template-areas:
    "userOptions nav nav"
    "friendList chat chatRoomOptions";

  @media ${mediaQuery.md} {
    grid-template-columns: 80px 2fr 1fr;
  }

  @media ${mediaQuery.xs}, ${mediaQuery.sm} {
    grid-template-columns: 80px 1fr 1fr;
  }
`;

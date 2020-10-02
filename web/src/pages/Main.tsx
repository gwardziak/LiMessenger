import React from "react";
import styled from "styled-components";
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
      <Chat>b</Chat>
      <FriendUserOptions>c</FriendUserOptions>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "userOptions nav nav"
    "friendList chat friendUserOptions
  ";

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    grid-template-columns: 80px 2fr 1fr;
  }
`;

const Chat = styled.div`
  grid-area: chat;
  background-color: black;
`;

const FriendUserOptions = styled.div`
  grid-area: friendUserOptions;
  background-color: grey;
`;

/*

    <Container>
      <FriendListContainer>
        <FriendListNav />
        <SearchBar />
        <FriendList />
      </FriendListContainer>
      <ContentContainer>
        <ContentNav />
        <ChatAndUserDetailsContainer>
          <UserDetails />
          <Chat />
        </ChatAndUserDetailsContainer>
      </ContentContainer>
    </Container>




const Container = styled.div`
  display: flex;
  background-color: #fff;
  min-width: 500px;
`;

const FriendListContainer = styled.div`
  min-width: 300px;
  max-width: 420px;
  flex: 0 0 25%;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    min-width: 80px;
    max-width: 80px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
`;

const ChatAndUserDetailsContainer = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: row-reverse;
`;

const ChatContainer = styled.div`
  flex: 2 0 0%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;
*/

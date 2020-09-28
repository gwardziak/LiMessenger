import React from "react";
import styled from "styled-components";
import { ContentNav } from "../components/ContentNav";
import { FriendList } from "../components/FriendList";
import { FriendListNav } from "../components/FriendListNav";
import { SearchBar } from "../components/SearchBar";
import { UserDetails } from "../components/UserDetails";
import { mediaQuery } from "../utils/css/cssMedia";

export const Main = () => {
  const users = [1, 2, 3, 4, 5, 5, 6];

  return (
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
          <ChatContainer></ChatContainer>
        </ChatAndUserDetailsContainer>
      </ContentContainer>
    </Container>
  );
};

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

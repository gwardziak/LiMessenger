import React from "react";
import styled from "styled-components";
import { Avatar } from "../ui/Avatar";
import { mediaQuery } from "../utils/css/cssMedia";
import { SearchBar } from "./SearchBar";

export const FriendList = () => {
  const users = [1, 2, 3, 4, 5, 5, 6];

  return (
    <>
      <SearchBar />
      <List>
        <ItemSelected>
          <AvatarContainer>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E" />
          </AvatarContainer>
          <LastMessageContainer>
            <Username>Adam Galon </Username>
            <Message>User: Lorem lipsum · Dziś</Message>
          </LastMessageContainer>
        </ItemSelected>
        {users.map(() => (
          <Item>
            <AvatarContainer>
              <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E" />
            </AvatarContainer>
            <LastMessageContainer>
              <Username>Adam Galon </Username>
              <Message>User: Lorem lipsum · Dziś</Message>
            </LastMessageContainer>
          </Item>
        ))}
      </List>
    </>
  );
};

const List = styled.ul`
  grid-area: friendList;
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-size: 13px;
`;

const Item = styled.li`
  display: flex;
  height: 64px;
  position: relative;
  padding: 0 8px;
  margin: 0 8px;
`;
//duplicate
const ItemSelected = styled.li`
  display: flex;
  height: 64px;
  position: relative;
  padding: 0 8px;
  background-color: rgba(0, 0, 0, 0.05);
  margin: 0 8px;
  border-radius: 10px;
`;

const AvatarContainer = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: center;
`;

const LastMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0px;
  justify-content: center;
  padding: 0 16px 0 0;
  font-weight: 400;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    display: none;
  }
`;

const Username = styled.div`
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
`;

const Message = styled.div`
  font-size: 13px;
  margin-right: 12px;
  color: rgba(153, 153, 153, 1);
`;

import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { useRootStore } from "../stores/RootStore";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
import { mediaQuery } from "../utils/css/cssMedia";
import { useMatchesMediaQuery } from "../utils/css/useMatchesMediaQuery";
import { MyScrollbar } from "../utils/Scrollbar";
import { formatDate } from "./../utils/formatDate";
import { SearchBar } from "./SearchBar";

export const FriendList = observer(() => {
  const isBg = useMatchesMediaQuery([mediaQuery.bg]);
  const rootStore = useRootStore();

  return (
    <MyScrollbar autoHide noScrollX>
      <Container>
        {isBg && <SearchBar />}
        <List>
          {rootStore.chatStore.firstMessages.map((message) => {
            const friendUuid =
              rootStore.userStore.uuid === message.sender.uuid
                ? message.recipient.uuid
                : message.sender.uuid;
            return (
              <Item
                isActive={rootStore.chatStore.activeChat === friendUuid}
                key={friendUuid}
                onClick={async (e) => {
                  try {
                    await rootStore.chatStore.fetchChatMessages(friendUuid);
                  } catch (ex) {
                    console.log("Error during selecting a chat", ex.message);
                  }
                }}
              >
                <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/cp0/c18.0.60.60a/p60x60/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&ccb=2&_nc_sid=dbb9e7&_nc_ohc=MptErBC1D4UAX850YxA&_nc_ht=scontent-frt3-1.xx&tp=27&oh=bf4dda367f66a8ea248e026dc05c4c9d&oe=5FDE9C73"></Avatar>
                <Username>
                  {rootStore.userStore.uuid === message.sender.uuid
                    ? message.recipient.username
                    : message.sender.username}
                </Username>
                <Message>
                  {rootStore.userStore.uuid === message.sender.uuid
                    ? "You: "
                    : `${message.sender.username}: `}
                  {message.text}
                  {` · ${formatDate(message.createdAt)}`}
                </Message>
              </Item>
            );
          })}
        </List>
      </Container>
    </MyScrollbar>
  );
});

const Container = styled.div`
  grid-area: friendList;
  display: grid;
  grid-template-rows: 36px 1fr;
  grid-row-gap: 16px;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-template-rows: 64px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0 8px;
  padding: 0;
`;

const Item = styled.li<{ isActive: boolean }>`
  display: grid;
  grid-template-areas: "avatar username" "avatar message";
  grid-template-rows: 32px 32px;
  grid-template-columns: 50px 1fr;
  grid-column-gap: 12px;
  padding: 0 8px;
  align-items: center;
  cursor: pointer;

  background-color: ${(props) => props.isActive && "rgba(0, 0, 0, 0.05)"};
  border-radius: ${(props) => props.isActive && "10px"};

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-template-rows: 64px;
    grid-template-columns: 62.2px;
    grid-template-areas: "avatar";
    justify-items: center;
    padding: 0;
  }
`;

const Avatar = styled(DefaultAvatar)`
  grid-area: avatar;
`;

const Username = styled.div`
  grid-area: username;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: flex-end;
  overflow: hidden;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

const Message = styled.div`
  grid-area: message;
  font-size: 13px;
  color: rgb(153, 153, 153);
  align-self: flex-start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

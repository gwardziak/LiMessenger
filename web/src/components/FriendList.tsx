import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { useRootStore } from "../stores/RootStore";
import { mediaQuery } from "../utils/css/cssMedia";
import { formatDate } from "../utils/formatDate";

export const FriendList = observer(() => {
  const rootStore = useRootStore();

  return (
    <Container>
      {rootStore.chatStore.firstMessages.map((message) => {
        const friendUuid =
          rootStore.userStore.uuid === message.sender.uuid
            ? message.recipient.uuid
            : message.sender.uuid;
        return (
          <Item
            isActive={rootStore.chatStore.activeChat === friendUuid}
            key={friendUuid}
            onClick={(e) => {
              if (rootStore.chatStore.activeChat !== friendUuid) {
                try {
                  rootStore.chatStore.setChatroom(friendUuid);
                  console.log("Fetch data");

                  if (
                    rootStore.chatStore.messagesInfo.get(
                      rootStore.chatStore.activeChat!
                    )?.initialFetch
                  ) {
                    rootStore.chatStore.fetchChatMessages();
                  }

                  console.log("Change room");
                } catch (ex) {
                  console.log("Error during selecting a chat", ex.message);
                }
              }
            }}
          >
            <Avatar src="assets/defaultAvatar.svg" />
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
    </Container>
  );
});

const Container = styled.ul`
  margin: 2px 8px 0px 8px;
  padding: 0;
  /* border-top: 1px solid #ced0d4; */
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
  border-radius: 10px;
  background-color: ${({ isActive, theme }) => isActive && theme.item.select};

  &:hover {
    background-color: ${({ theme }) => theme.item.hover};
  }

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-template-rows: 64px;
    grid-template-columns: 62.2px;
    grid-template-areas: "avatar";
    justify-items: center;
    padding: 0;
  }
`;

const Avatar = styled.img`
  grid-area: avatar;
  border-radius: 50%;
  height: 50px;
  width: 50px;
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
  color: ${({ theme }) => theme.text.color.secondary};
  align-self: flex-start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

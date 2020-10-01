import React from "react";
import styled from "styled-components";
import { Avatar } from "../ui/Avatar";
import { Component } from "./Component";

export const Chat = () => {
  return (
    <>
      <Container>
        <ChatContainer>
          <MessagesAndAvatarContainer>
            <AvatarContainer>
              <MiniAvatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E"></MiniAvatar>
            </AvatarContainer>
            <MessagesContainer>
              <Message>Już wrzucam</Message>
              <Message>Już wrzucam</Message>
              <Message>Już wrzucam</Message>
            </MessagesContainer>
          </MessagesAndAvatarContainer>
          <MessagesAndAvatarContainer>
            <AvatarContainer>
              <MiniAvatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E"></MiniAvatar>
            </AvatarContainer>
            <MessagesContainer>
              <Message>Już wrzucam</Message>
            </MessagesContainer>
          </MessagesAndAvatarContainer>
          <MessageDate>Dziś</MessageDate>
          <MessagesAndAvatarContainer>
            <AvatarContainer>
              <MiniAvatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E"></MiniAvatar>
            </AvatarContainer>
            <MessagesContainer>
              <Message>Już wrzucam</Message>
              <Message>Już wrzucam</Message>
            </MessagesContainer>
          </MessagesAndAvatarContainer>
          <MessagesAndAvatarContainerDuplicate>
            <MessagesContainer>
              <DuplicateMessage>My mess</DuplicateMessage>
              <DuplicateMessage>
                jak wychodzilismy to troceh glupoty pierdoliles
              </DuplicateMessage>
            </MessagesContainer>
          </MessagesAndAvatarContainerDuplicate>
        </ChatContainer>
        <SendMessageContainer>
          <Component />
        </SendMessageContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  flex: 2 0 0%;
  display: flex;
  flex-direction: column;
`;

const ChatContainer = styled.div`
  font-size: 15px;
  padding: 0 30px 0 12px;
`;

const MessagesAndAvatarContainer = styled.div`
  margin-bottom: 15px;
  position: relative;

  &:after {
    clear: both;
    content: ".";
    display: block;
    font-size: 0;
    height: 0;
    line-height: 0;
    visibility: hidden;
  }
`;

const AvatarContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  bottom: 2px;
  position: absolute;
`;

const MiniAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
`;

const MessagesContainer = styled.div`
  margin-bottom: 15px;
  margin-left: 36px;
`;

const DuplicateMessage = styled.div`
  max-width: 85%;
  font-size: 14px;
  background-color: #09f;
  color: #fff;
  margin: 1px 0;
  padding: 6px 12px 7px;
  border-top-left-radius: 1.3em;
  border-bottom-left-radius: 1.3em;
  clear: right;
  float: right;

  :first-child {
    border-top-right-radius: 1.3em;
  }

  :last-child {
    border-bottom-right-radius: 1.3em;
  }
`;

const MessagesAndAvatarContainerDuplicate = styled.div`
  margin-bottom: 15px;
  position: relative;
  margin-left: 36px;

  &:after {
    clear: both;
    content: ".";
    display: block;
    font-size: 0;
    height: 0;
    line-height: 0;
    visibility: hidden;
  }
`;

const Message = styled.div`
  max-width: 85%;
  font-size: 14px;
  background-color: #f1f0f0;
  margin: 1px 0;
  padding: 6px 12px 7px;
  border-top-right-radius: 1.3em;
  border-bottom-right-radius: 1.3em;
  clear: left;
  float: left;

  :first-child {
    border-top-left-radius: 1.3em;
  }

  :last-child {
    border-bottom-left-radius: 1.3em;
  }
`;

const SendMessageContainer = styled.div``;

const MessageDate = styled.h4`
  display: block;
  font-weight: 500;
  margin: 12px 0 12px 20px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
  text-align: center;
`;

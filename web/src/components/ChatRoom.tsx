import { observer } from "mobx-react-lite";
import React, { useLayoutEffect, useRef } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import styled, { css } from "styled-components";
import { useRootStore } from "../stores/RootStore";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
import { MyScrollbar } from "../utils/Scrollbar";

type ChatRoomProps = {
  isScrolled: boolean;
  setIsScrolled(val: boolean): void;
};

export const ChatRoom = observer(
  ({ isScrolled, setIsScrolled }: ChatRoomProps) => {
    const rootStore = useRootStore();
    const scrollbarRef = useRef<Scrollbar>(null);

    useLayoutEffect(() => {
      scrollbarRef.current?.scrollToBottom();
    });

    if (!rootStore.chatStore.roomMessages) {
      return <div>loading...</div>;
    }

    const handleScrollUpdate = () => {
      if (!isScrolled) {
        scrollbarRef.current?.scrollToBottom();
        setIsScrolled(true);
      }
    };

    return (
      <StyledScrollbar
        elementRef={scrollbarRef}
        autoHide
        noScrollX
        onUpdate={(e: React.ChangeEvent<HTMLInputElement>) =>
          isScrolled ? null : handleScrollUpdate()
        }
      >
        <Container>
          <MessageDate>Dziś</MessageDate>
          {rootStore.chatStore.roomMessages.map((messages) => {
            const sender = rootStore.userStore.uuid === messages[0].sender.uuid;
            return (
              <MessageContainer key={messages[0].uuid} messagesSender={sender}>
                <GroupMessages messagesSender={sender}>
                  {messages.map((message) => {
                    return (
                      <Message key={message.uuid} sender={sender}>
                        {message.text}
                      </Message>
                    );
                  })}
                </GroupMessages>
                {!sender && (
                  <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/cp0/c18.0.60.60a/p60x60/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&ccb=2&_nc_sid=dbb9e7&_nc_ohc=MptErBC1D4UAX850YxA&_nc_ht=scontent-frt3-1.xx&tp=27&oh=bf4dda367f66a8ea248e026dc05c4c9d&oe=5FDE9C73" />
                )}
              </MessageContainer>
            );
          })}
        </Container>
      </StyledScrollbar>
    );
  }
);

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  padding: 0 20px 0 12px;
  grid-row-gap: 15px;
  padding-bottom: 20px;
`;

const GroupMessages = styled.div<{ messagesSender: boolean }>`
  display: grid;
  grid-gap: 2px;
  justify-items: ${(props) => props.messagesSender && "flex-end"};
`;

const MessageDate = styled.h4`
  display: grid;
  font-weight: 500;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
  justify-self: center;
`;

const MessageContainer = styled.div<{ messagesSender: boolean }>`
  display: grid;
  grid-gap: 2px;
  align-items: flex-end;
  grid-template-columns: ${(props) => !props.messagesSender && "36px 1fr"};
`;

const Message = styled.div<{ sender: boolean }>`
  display: grid;
  font-size: 14px;
  padding: 6px 12px 7px;
  max-width: 85%;
  width: fit-content;
  min-height: 32px;
  box-sizing: border-box;
  overflow-wrap: anywhere;
  background-color: ${(props) => (props.sender ? "#09f" : "#f1f0f0")};
  color: ${(props) => props.sender && "#fff"};
  ${(props) =>
    !props.sender &&
    css`
      border-top-right-radius: 1.3em;
      border-bottom-right-radius: 1.3em;
      :first-child {
        border-top-left-radius: 1.3em;
      }
      :last-child {
        border-bottom-left-radius: 1.3em;
      }
    `}
  ${(props) =>
    props.sender &&
    css`
      border-top-left-radius: 1.3em;
      border-bottom-left-radius: 1.3em;
      :first-child {
        border-top-right-radius: 1.3em;
      }
      :last-child {
        border-bottom-right-radius: 1.3em;
      }
    `}
`;

const Avatar = styled(DefaultAvatar)`
  display: grid;
  grid-row: 1;
  width: 32px;
  height: 32px;
  /* align-self: flex-end; */
  /* grid-row: 4; */
`;

const StyledScrollbar = styled(MyScrollbar)`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

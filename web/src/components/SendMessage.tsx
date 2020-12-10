import { BaseEmoji } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Attachment } from "../Icons/Attachment";
import { Camera } from "../Icons/Camera";
import { EmojiFolder } from "../Icons/EmojiFolder";
import { GamePad } from "../Icons/GamePad";
import { GifFolder } from "../Icons/GifFolder";
import { Like } from "../Icons/Like";
import { Microphone } from "../Icons/Microphone";
import { Plus } from "../Icons/Plus";
import { Smile } from "../Icons/Smile";
import { useRootStore } from "../stores/RootStore";
import { mediaQuery } from "../utils/css/cssMedia";
import { useMatchesMediaQuery } from "../utils/css/useMatchesMediaQuery";
import { ContentEditable } from "../utils/ReactContentEditable";
import { useIsVisible } from "../utils/useIsVisible";
import { EmojiPicker } from "./EmojiPicker";

type SendMessageProps = {
  setIsScrolled(val: boolean): void;
};

export const SendMessage = observer(({ setIsScrolled }: SendMessageProps) => {
  const rootStore = useRootStore();
  const isMobile = useMatchesMediaQuery([
    mediaQuery.xs,
    mediaQuery.sm,
    mediaQuery.md,
  ]);
  const defaultInput = "Wpisz wiadomość...";
  const [toggle, setToggle] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { ref, isVisible, setIsVisible, handlerRef } = useIsVisible(false);
  const inputRef = useRef<HTMLElement>(null);

  return (
    <Container isToggle={toggle}>
      <PlusIcon
        onClick={() => setToggle(!toggle)}
        isToggle={toggle}
        viewBox="0 0 24 24"
      />
      {!isMobile && (
        <>
          {toggle && !isMobile && (
            <>
              <CameraIcon viewBox="0 0 36 36" />
              <GamePadIcon viewBox="0 0 36 36" />
              <MicrophoneIcon viewBox="0 0 36 36" />
            </>
          )}
          <GifIcon viewBox="0 0 36 36" />
          <EmojiIcon viewBox="0 0 36 36" />

          <AttachmentIcon viewBox="0 0 36 36" />
        </>
      )}
      {isMobile && toggle && (
        <MobileIconsContainer>
          <AttachmentIcon viewBox="0 0 36 36" />
          <EmojiIcon viewBox="0 0 36 36" />
          <GifIcon viewBox="0 0 36 36" />
          <MicrophoneIcon viewBox="0 0 36 36" />
          <GamePadIcon viewBox="0 0 36 36" />
          <CameraIcon viewBox="0 0 36 36" />
        </MobileIconsContainer>
      )}

      <MessageContainer isToggle={toggle}>
        <Input
          ref={inputRef}
          placeholder={defaultInput}
          html={input}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setInput(e.target.value)
          }
          onKeyDown={async (e: KeyboardEvent) => {
            if (e.keyCode === 13) {
              e.preventDefault();

              try {
                await rootStore.chatStore.sendMessage(input);
                setIsScrolled(false);
                setInput("");
              } catch (ex) {
                throw new Error("Error during sending a message" + ex.message);
              }
            }
          }}
        />

        <SmileIcon
          ref={handlerRef}
          viewBox="0 0 26 26"
          onClick={() => setIsVisible(!isVisible)}
        />
        {isVisible && (
          <EmojiPicker
            ref={ref}
            onSelect={(emoji: BaseEmoji) => {
              setInput(input + emoji.native);
              setIsVisible(false);

              inputRef.current && inputRef.current.focus();
            }}
          />
        )}
      </MessageContainer>
      <LikeIcon viewBox="0 1 36 36" />
    </Container>
  );
});

const Container = styled.div<{ isToggle: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isToggle
      ? "28px 36px 36px 36px 36px 36px 36px 1fr 36px"
      : "28px 36px 36px 36px 1fr 36px"};
  grid-template-rows: 1fr;
  padding: 0 8px;
  grid-column-gap: 8px;
  align-items: flex-end;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-bottom: 8px;
  position: relative;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-template-columns: ${(props) => props.isToggle && "28px 1fr 36px"};
    grid-template-rows: ${(props) => (props.isToggle ? "52px 1fr" : "1fr")};
    grid-row-gap: 8px;
  }
`;

const PlusIcon = styled(Plus)<{ isToggle?: boolean }>`
  height: 24px;
  width: 24px;
  justify-self: center;
  margin-bottom: 6px;

  fill: ${(props) =>
    props.isToggle ? "rgba(134, 142, 153, 0.75)" : "rgb(0, 153, 255)"};
  transition: transform 0.22s cubic-bezier(0.5, 0, 0.4, 1);
  transform: ${(props) => props.isToggle && "rotate(45deg)"};
  cursor: pointer;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-row: ${(props) => props.isToggle && 2};
  }
`;

const GifIcon = styled(GifFolder)`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const EmojiIcon = styled(EmojiFolder)`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const AttachmentIcon = styled(Attachment)`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const CameraIcon = styled(Camera)`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const GamePadIcon = styled(GamePad)`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const MicrophoneIcon = styled(Microphone)`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const LikeIcon = styled(Like)`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const MessageContainer = styled.div<{ isToggle: boolean }>`
  display: grid;
  grid-template-columns: 1fr 24px;
  grid-template-rows: 1fr;
  background-color: rgba(0, 0, 0, 0.05);
  min-width: 100px;
  border-radius: 18px;
  padding: 0 8px 0 12px;
  align-items: flex-end;
  cursor: context-menu;
  font-size: 14px;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-column: ${(props) => (props.isToggle ? "2/3" : "2/6")};
  }
`;

const Input = styled(ContentEditable)`
  padding: 9px 0;
  outline: 0;
  cursor: text;
  overflow: hidden;
  max-height: 144px;
  overflow-y: auto;

  :empty {
    color: rgba(0, 0, 0, 0.4);
  }

  :empty:before {
    cursor: text;
    color: rgba(0, 0, 0, 0.4);
    content: attr(placeholder);
    display: block; // For Firefox
  }
`;

const SmileIcon = styled(Smile)`
  height: 24px;
  width: 24px;
  fill: #0099ff;
  cursor: pointer;
  padding-bottom: 7px;
`;

const MobileIconsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 36px);
  background-color: #fafafa;
  column-gap: 16px;
  grid-column: 1/4;
  padding: 8px 0 8px 8px;
  margin: 0 -8px;
`;

import React, { useState } from "react";
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
import { mediaQuery } from "../utils/css/cssMedia";
import { useMatchesMediaQuery } from "../utils/css/useMatchesMediaQuery";
import ContentEditable from "../utils/ReactContentEditable";

export const SendMessage = () => {
  const isMobile = useMatchesMediaQuery([
    mediaQuery.xs,
    mediaQuery.sm,
    mediaQuery.md,
  ]);
  const defaultInput = "Wpisz wiadomość...";
  const [toggle, setToggle] = useState<boolean>(false);
  const [input, setInput] = useState<string>(defaultInput);

  const handleBlur = () => (input === "" ? setInput(defaultInput) : null);

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
        <MobileIconsContainer isToggle={toggle}>
          <AttachmentIcon isToggle={toggle} viewBox="0 0 36 36" />
          <EmojiIcon isToggle={toggle} viewBox="0 0 36 36" />
          <GifIcon isToggle={toggle} viewBox="0 0 36 36" />
          <MicrophoneIcon isToggle={toggle} viewBox="0 0 36 36" />
          <GamePadIcon isToggle={toggle} viewBox="0 0 36 36" />
          <CameraIcon isToggle={toggle} viewBox="0 0 36 36" />
        </MobileIconsContainer>
      )}

      <MessageContainer isToggle={toggle}>
        <Input
          html={input}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setInput(e.target.value)
          }
          onBlur={handleBlur}
        />

        <SmileIcon viewBox="0 0 26 26" />
      </MessageContainer>
      <LikeIcon viewBox="0 1 36 36" />
    </Container>
  );
};

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

const GifIcon = styled(GifFolder)<{ isToggle?: boolean }>`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const EmojiIcon = styled(EmojiFolder)<{ isToggle?: boolean }>`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const AttachmentIcon = styled(Attachment)<{ isToggle?: boolean }>`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const CameraIcon = styled(Camera)<{ isToggle?: boolean }>`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const GamePadIcon = styled(GamePad)<{ isToggle?: boolean }>`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const MicrophoneIcon = styled(Microphone)<{ isToggle?: boolean }>`
  height: 36px;
  width: 36px;
  fill: rgb(0, 153, 255);
  cursor: pointer;
`;

const LikeIcon = styled(Like)<{ isToggle?: boolean }>`
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
  cursor: auto;
  overflow: hidden;
  max-height: 144px;
  overflow-y: auto;

  &::placeholder {
    color: red;
  }
`;

const SmileIcon = styled(Smile)`
  height: 24px;
  width: 24px;
  fill: #0099ff;
  cursor: pointer;
  padding-bottom: 7px;
`;

const MobileIconsContainer = styled.div<{ isToggle: boolean }>`
  display: grid;
  grid-template-columns: repeat(6, 36px);
  background-color: #fafafa;
  column-gap: 16px;
  grid-column: 1/4;
  padding: 8px 0 8px 8px;
  margin: 0 -8px;
`;

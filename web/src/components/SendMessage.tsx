import { BaseEmoji, EmojiData, emojiIndex } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useUploadAttachmentMutation } from "../generated/graphql";
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
  uploadFiles: File[];
  setUploadFiles(val: File[]): void;
};

export const SendMessage = observer(
  ({ setIsScrolled, uploadFiles, setUploadFiles }: SendMessageProps) => {
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
    const [emojiStartPosition, setEmojiStartPosition] = useState<number>(-1);
    const emojiStartingChars: string[] = [":", ";", "="];
    const uploadFilesRef = useRef<HTMLInputElement>(null);

    const [, upload] = useUploadAttachmentMutation();
    const handleUploadSubmit = async () => {
      const response = await upload({
        files: uploadFiles,
      });
      console.log(response, "img sent");
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (files && files.length) {
        const transform = Array.from(uploadFiles);

        // const filename = files[0].name;
        // const parts = filename.split(".");
        // const fileType = parts[parts.length - 1];
        // console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
        // //filter jpg/ jpeg/ png

        setUploadFiles([...files, ...transform]);
      }
    };

    const handleRemoveFile = (id: number) => {
      const filter = uploadFiles.filter(
        (file) => file.size + file.lastModified !== id
      );
      setUploadFiles(filter);
    };

    const pasteAsPlainText = (event: ClipboardEvent) => {
      event.preventDefault();

      const text = event.clipboardData?.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    };

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
            <AttachmentIcon
              viewBox="0 0 36 36"
              onClick={() =>
                uploadFilesRef.current && uploadFilesRef.current.click()
              }
            />
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

        <MessageContainer isToggle={toggle} hasFile={uploadFiles?.length > 0}>
          <UploadFiles
            multiple
            type="file"
            ref={uploadFilesRef}
            onChange={handleFileUpload}
          />

          {uploadFiles.length > 0 && (
            <>
              <Files>
                {uploadFiles.map((file: File) => (
                  <FileContainer key={file.lastModified + file.size}>
                    {file.type.includes("image") ? (
                      <UploadImg src={URL.createObjectURL(file)}></UploadImg>
                    ) : (
                      <UploadFile>
                        <UploadFileImgContainer>
                          <UploadFileImg />
                        </UploadFileImgContainer>
                        <UploadFilename>{file.name}</UploadFilename>
                      </UploadFile>
                    )}
                    <CloseFile
                      onClick={() =>
                        handleRemoveFile(file.lastModified + file.size)
                      }
                    >
                      <CloseFileImg />
                    </CloseFile>
                  </FileContainer>
                ))}
                <UploadMore
                  onClick={() =>
                    uploadFilesRef.current && uploadFilesRef.current.click()
                  }
                >
                  <UploadMoreImg />
                </UploadMore>
              </Files>
            </>
          )}
          <Input
            ref={inputRef}
            placeholder={defaultInput}
            html={input}
            onPaste={pasteAsPlainText}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setInput(e.target.value)
            }
            onKeyDown={async (e: KeyboardEvent) => {
              if (emojiStartingChars.includes(e.key)) {
                setEmojiStartPosition(input.replace(/&nbsp;/g, " ").length);
              }

              if (e.key === " " && emojiStartPosition !== -1) {
                const emojiString = input.substring(emojiStartPosition);
                const emojis: EmojiData[] | null = emojiIndex.search(
                  emojiString
                );

                if (
                  emojis === null ||
                  emojis.length === 0 ||
                  !emojis[0].hasOwnProperty("native")
                ) {
                  setEmojiStartPosition(-1);
                } else {
                  setInput(
                    input.substr(0, emojiStartPosition) +
                      (emojis[0] as BaseEmoji).native
                  );
                  setEmojiStartPosition(-1);
                }
              }
              if (e.keyCode === 13) {
                e.preventDefault();

                try {
                  await rootStore.chatStore.sendMessage(
                    input.replace(/&nbsp;/g, " ")
                  );
                  setIsScrolled(false);
                  setInput("");
                } catch (ex) {
                  throw new Error(
                    "Error during sending a message" + ex.message
                  );
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
              native={true}
              ref={ref}
              onSelect={(emoji: BaseEmoji) => {
                setInput(input + emoji.native);
                setIsVisible(false);
                inputRef.current && inputRef.current.focus();
              }}
            />
          )}
        </MessageContainer>
        <input value="elo" onClick={() => handleUploadSubmit()} />
        <LikeIcon viewBox="0 1 36 36" />
      </Container>
    );
  }
);

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

const UploadFiles = styled.input`
  display: none;
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

const Files = styled.div`
  display: flex;
  grid-column: 1/3;
  overflow-y: auto;
  grid-row-gap: 2px;
  grid-column-gap: 12px;
`;

const MessageContainer = styled.div<{ isToggle: boolean; hasFile: boolean }>`
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

  grid-template-rows: ${(props) => props.hasFile && "auto 1fr"};

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

const FileContainer = styled.div`
  position: relative;
  height: 62px;
  display: grid;
  align-content: flex-end;
  padding-bottom: 3px;
`;

const UploadImg = styled.img`
  display: grid;
  border-radius: 10px;
  object-fit: cover;
  height: 48px;
  width: 48px;
`;

const UploadFile = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  border-radius: 10px;
  height: 48px;
  width: 152px;
  background-color: rgba(134, 142, 153, 0.25);
  padding: 0 16px 0 8px;
  box-sizing: border-box;
  grid-column-gap: 10px;
`;

const UploadFileImgContainer = styled.div`
  display: grid;
  height: 24px;
  width: 24px;
  background-color: rgb(255, 255, 255);
  align-self: center;
  border-radius: 50%;
  align-content: center;
  justify-content: center;
`;

const UploadFileImg = styled.div`
  background-image: url("assets/staticImages2.png");
  background-size: 46px 1934px;
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;
  background-position: -26px -528px;
`;
const UploadFilename = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #050505;
  font-weight: 600;
  font-size: 15px;
  align-self: center;
  word-break: break-word;
`;

const CloseFile = styled.div`
  position: absolute;
  background-color: #fff;
  height: 24px;
  width: 24px;
  top: 8px;
  right: -8px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: grid;
  justify-content: center;
  align-content: center;

  :hover {
    background-color: rgb(242, 242, 242);
  }
`;

const CloseFileImg = styled.div`
  display: grid;
  justify-self: center;
  height: 12px;
  width: 12px;
  background-image: url("assets/staticImages.png");
  background-size: 52px 718px;
  background-repeat: no-repeat;
  background-position: -36px -662px;
`;

const UploadMore = styled.div`
  display: grid;
  border-radius: 10px;
  height: 48px;
  width: 48px;
  justify-content: center;
  background-color: rgba(134, 142, 153, 0.25);
  align-self: flex-end;
  min-width: 48px;
  margin-bottom: 3px;
  cursor: pointer;

  :hover {
    background-color: rgb(205, 207, 211);
  }
`;

const UploadMoreImg = styled.div`
  display: grid;
  justify-self: center;
  align-self: center;
  height: 24px;
  width: 24px;

  background-image: url("assets/staticImages2.png");
  background-size: 46px 1934px;
  background-repeat: no-repeat;
  background-position: 0 -1100px;
`;

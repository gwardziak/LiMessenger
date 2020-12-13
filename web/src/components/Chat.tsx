import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { ChatRoom } from "./ChatRoom";
import { SendMessage } from "./SendMessage";

export const Chat = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container {...getRootProps()}>
      {isDragActive && <DropMessage>Drop the files here ... </DropMessage>}
      <ChatRoom isScrolled={isScrolled} setIsScrolled={setIsScrolled} />
      <SendMessage setIsScrolled={setIsScrolled} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: chat;
  display: grid;
  grid-template-rows: 1fr minmax(52px, auto);
  outline: none;
  position: relative;
`;

const DropMessage = styled.div`
  z-index: 999;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.85;
  background-color: rgb(228, 230, 235);
`;

import React from "react";
import styled from "styled-components";
import { Attachment } from "../stores/ChatStore";
import { File } from "./../Icons/File";

type FilesProps = {
  files: Attachment[];
  sender: boolean;
};

export const Files = ({ files, sender }: FilesProps) => {
  return (
    <>
      {files.map((file) => {
        return (
          <LinkContainer
            key={file.uuid}
            href={`http://localhost:4000/${file.link}`}
          >
            <Container sender={sender}>
              <ImageContainer>
                <FileIcon />
              </ImageContainer>
              <Filename>{file.name}</Filename>
            </Container>
          </LinkContainer>
        );
      })}
    </>
  );
};

const LinkContainer = styled.a`
  text-decoration: none;
  cursor: pointer;
  max-width: 85%;
  width: fit-content;
`;
const Container = styled.div<{ sender: boolean }>`
  display: grid;
  grid-template-columns: 24px 1fr;
  padding: 7px 16px 8px 8px;
  box-sizing: border-box;
  grid-column-gap: 10px;

  border-radius: ${({ sender }) =>
    sender ? "10px 0 0 10px" : "0 10px 10px 0"};
  background-color: ${({ theme }) => theme.item.hover};
`;

const ImageContainer = styled.div`
  display: grid;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  justify-self: center;
  align-self: center;

  background-color: ${({ theme }) => theme.body.background};
`;

const FileIcon = styled(File)`
  height: 70%;
  width: 90%;
  justify-self: center;
  align-self: center;

  fill: ${({ theme }) => theme.text.color.primary};
`;

const Filename = styled.div`
  font-weight: 600;
  font-size: 14px;
  align-self: center;
  word-break: break-word;

  color: ${({ theme }) => theme.text.color.primary};
`;

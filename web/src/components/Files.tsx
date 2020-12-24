import React from "react";
import styled from "styled-components";
import { Attachment } from "../stores/ChatStore";

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
                <Image />
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
  border-radius: ${(props) =>
    props.sender ? "10px 0 0 10px" : "0 10px 10px 0"};
  background-color: rgba(134, 142, 153, 0.25);
  padding: 7px 16px 8px 8px;
  box-sizing: border-box;
  grid-column-gap: 10px;
`;

const ImageContainer = styled.div`
  display: grid;
  height: 24px;
  width: 24px;
  background-color: rgb(255, 255, 255);
  align-self: center;
  border-radius: 50%;
  align-content: center;
  justify-content: center;
`;

const Image = styled.div`
  background-image: url("assets/staticImages2.png");
  background-size: 46px 1934px;
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;
  background-position: -26px -528px;
`;
const Filename = styled.div`
  display: grid;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #050505;
  font-weight: 600;
  font-size: 14px;
  align-self: center;
  word-break: break-word;
`;

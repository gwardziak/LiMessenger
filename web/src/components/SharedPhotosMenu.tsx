import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styled from "styled-components";
import { ModalProvider } from "styled-react-modal";
import { DownArrow } from "../Icons/DownArrow";
import { UpArrow } from "../Icons/UpArrow";
import { Attachment } from "../stores/ChatStore";
import { useRootStore } from "../stores/RootStore";
import { Gallery } from "./Gallery";

type FileProps = {
  isOpen: boolean;
  setIsOpen(val: boolean): void;
};

type ImageProps = {
  image: Attachment;
};

export const SharedPhotosMenu = observer(({ isOpen, setIsOpen }: FileProps) => {
  const rootStore = useRootStore();

  return (
    <Container isToggle={isOpen}>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <HeaderText>Shared images</HeaderText>
        {isOpen ? <UpArrowIcon /> : <DownArrowIcon />}
      </Header>
      {isOpen && (
        <Photos>
          {rootStore.attachmentsStore.imageAttachments.map((image) => (
            <Image key={image.uuid} image={image} />
          ))}
        </Photos>
      )}
    </Container>
  );
});

const Image = ({ image }: ImageProps) => {
  const [isZoomImage, setIsZoomImage] = useState<boolean>(false);

  return (
    <>
      <PhotoContainer onClick={() => setIsZoomImage(!isZoomImage)}>
        <Photo src={`http://localhost:4000/${image.link}`} />
      </PhotoContainer>
      {isZoomImage && (
        <ModalProvider>
          <Gallery
            image={`http://localhost:4000/${image.link}`}
            zoomImage={isZoomImage}
            setZoomImage={setIsZoomImage}
          />
        </ModalProvider>
      )}
    </>
  );
};

const Container = styled.div<{ isToggle: boolean }>`
  grid-area: sharedPhotosMenu;
  display: grid;
  grid-template-rows: ${(props) => (props.isToggle ? "49px 1fr" : "48px")};
  width: 100%;
  margin-bottom: ${({ isToggle }) => (isToggle ? "16px" : "0")};
  border-top: ${({ theme }) => `1px solid ${theme.divider.color}`};
`;

const Header = styled.div`
  display: grid;
  grid-template-rows: 20px;
  grid-template-columns: 1fr 20px;
  padding: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.item.hover};
  }
`;

const HeaderText = styled.div`
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Photos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 12px;
  grid-gap: 4px 4px;
  box-sizing: border-box;
`;

const PhotoContainer = styled.div`
  display: block;
  padding-top: 100%;
  cursor: pointer;
  position: relative;
  width: 100%;

  &:hover {
    background-color: rgba(0, 0, 0);
    opacity: 0.95;
  }
`;

const Photo = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  &:hover {
    opacity: 0.95;
  }
`;

const UpArrowIcon = styled(UpArrow)`
  align-self: center;
  justify-self: center;
  height: 70%;
  width: 70%;

  fill: ${({ theme }) => theme.svg.color};
`;

const DownArrowIcon = styled(DownArrow)`
  align-self: center;
  justify-self: center;
  height: 70%;
  width: 70%;

  fill: ${({ theme }) => theme.svg.color};
`;

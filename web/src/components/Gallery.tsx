import React from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { Close } from "../Icons/Close";
import { Download } from "./../Icons/Download";

type IGalleryProps = {
  image: string;
  zoomImage: boolean;
  setZoomImage(val: boolean): void;
};

export const Gallery = ({ image, zoomImage, setZoomImage }: IGalleryProps) => {
  return (
    <StyledModal
      isOpen={zoomImage}
      onBackgroundClick={() => setZoomImage(false)}
      onEscapeKeydown={() => setZoomImage(false)}
    >
      <ImageContainer>
        <LeftIconContainer onClick={() => setZoomImage(false)}>
          <CloseIcon />
        </LeftIconContainer>
        <RightIconContainer>
          <DownloadLink href={image} download />
          <DownloadIcon />
        </RightIconContainer>
        <Image src={image} />
      </ImageContainer>
      <GalleryContainer></GalleryContainer>
    </StyledModal>
  );
};

const StyledModal = Modal.styled`
  display: grid;
  grid-template-rows: minmax(10px, auto) 52px;
  align-self: normal;
  background: #000;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: grid;
  justify-content: center;
`;

const Image = styled.img`
  max-height: calc(100vh - 52px);
  max-width: calc(100vw - 160px);
  object-fit: cover;
  align-self: center;
  position: relative;
`;

const IconContainer = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  position: absolute;

  cursor: pointer;
  background-color: rgb(49, 49, 49);

  &:hover {
    background-color: rgb(70, 70, 71);
  }
`;

const DownloadLink = styled.a`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const LeftIconContainer = styled(IconContainer)`
  left: 0;
  margin: 8px 0 0 16px;
`;

const RightIconContainer = styled(IconContainer)`
  right: 0;
  margin: 8px 16px 0 0px;
`;

const CloseIcon = styled(Close)`
  height: 20px;
  width: 20px;

  fill: #fff;
`;

const DownloadIcon = styled(Download)`
  height: 20px;
  width: 20px;

  fill: #fff;
`;

const GalleryContainer = styled.div`
  display: grid;
  height: 36px;
  width: 100%;
  margin: 8px 0;
  background: rgb(49, 49, 49);
`;

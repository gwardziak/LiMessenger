import React, { useState } from "react";
import styled from "styled-components";
import { ModalProvider } from "styled-react-modal";
import { Attachment } from "../stores/ChatStore";
import { Gallery } from "./Gallery";

type ImageProps = {
  image: Attachment;
  imageCount: number;
};

export const Image = ({ image, imageCount }: ImageProps) => {
  const [isZoomImage, setIsZoomImage] = useState<boolean>(false);

  return (
    <>
      <Img
        height={image.height}
        width={image.width}
        src={`http://localhost:4000/${image.link}`}
        onClick={() => setIsZoomImage(!isZoomImage)}
        imageCount={imageCount}
      />
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

const handleImageHeight = (imageCount: number) => {
  switch (imageCount) {
    case 1:
      return "auto";
    case 2:
      return "190px";
    default:
      return "125px";
  }
};

export const Img = styled.img<{ imageCount: number }>`
  max-height: 400px;
  max-width: 100%;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.4);
  border-radius: ${({ imageCount }) => (imageCount > 1 ? "4px" : "18px")};
  height: ${({ imageCount }) => handleImageHeight(imageCount)};
  cursor: pointer;
`;

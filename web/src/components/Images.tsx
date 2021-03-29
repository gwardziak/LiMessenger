import React from "react";
import styled from "styled-components";
import { Attachment } from "../stores/ChatStore";

type ImagesProps = {
  images: Attachment[];
  elementsInCol?: number;
};

export const Images = ({ images, elementsInCol }: ImagesProps) => {
  return (
    <Container imagesCount={images.length}>
      {images.map((image) => (
        <Image
          height={image.height}
          width={image.width}
          imagesCount={elementsInCol ? elementsInCol : images.length}
          key={image.uuid}
          src={`http://localhost:4000/${image.link}`}
        />
      ))}
    </Container>
  );
};

const handleColumnTemplate = (imagesCount: number) => {
  switch (imagesCount) {
    case 1:
      return "1fr";
    case 2:
      return "1fr 1fr";
    default:
      return "1fr 1fr 1fr";
  }
};

const Container = styled.div<{ imagesCount: number }>`
  display: grid;
  grid-gap: 4px;
  max-width: 75%;
  border-radius: ${(props) => (props.imagesCount > 1 ? "4px" : "18px")};
  grid-template-columns: ${(props) => handleColumnTemplate(props.imagesCount)};
`;

const handleImageHeight = (imagesCount: number) => {
  switch (imagesCount) {
    case 1:
      return "auto";
    case 2:
      return "190px";
    default:
      return "125px";
  }
};

const Image = styled.img<{ imagesCount: number }>`
  max-height: 400px;
  max-width: 100%;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.4);
  border-radius: ${(props) => (props.imagesCount > 1 ? "4px" : "18px")};
  height: ${(props) => handleImageHeight(props.imagesCount)};
`;

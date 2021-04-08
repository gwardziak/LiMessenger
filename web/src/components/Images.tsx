import React from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { Image, Img } from "../components/Image";
import { Attachment } from "../stores/ChatStore";

type ImagesProps = {
  images: Attachment[];
};

export const Images = ({ images }: ImagesProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "600px 0px",
  });

  return (
    <Container imageCount={images.length} ref={ref}>
      {images.map((image) =>
        inView ? (
          <Image key={image.uuid} image={image} imageCount={images.length} />
        ) : (
          //placeholder
          <Img
            key={image.uuid}
            height={image.height}
            width={image.width}
            imageCount={images.length}
            data-src={`http://localhost:4000/${image.link}`}
          />
        )
      )}
    </Container>
  );
};

const handleColumnTemplate = (imageCount: number) => {
  switch (imageCount) {
    case 1:
      return "1fr";
    case 2:
      return "1fr 1fr";
    default:
      return "1fr 1fr 1fr";
  }
};

const Container = styled.div<{ imageCount: number }>`
  display: grid;
  grid-gap: 4px;
  max-width: 75%;
  border-radius: ${({ imageCount }) => (imageCount > 1 ? "4px" : "18px")};
  grid-template-columns: ${({ imageCount }) =>
    handleColumnTemplate(imageCount)};
`;

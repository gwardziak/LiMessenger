import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { useRootStore } from "../stores/RootStore";

type FileProps = {
  isOpen: boolean;
  setIsOpen(val: boolean): void;
};

export const SharedPhotosMenu = observer(({ isOpen, setIsOpen }: FileProps) => {
  const rootStore = useRootStore();

  return (
    <Container isToggle={isOpen}>
      <Header isToggle={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <HeaderText>Udostępnione zdjęcia</HeaderText>
        <HeaderIcon isToggle={isOpen} />
      </Header>
      {isOpen && (
        <Photos>
          {rootStore.attachmentsStore.imageAttachments.map((image) => (
            <PhotoContainer key={image.uuid}>
              <Photo src={`http://localhost:4000/${image.link}`} />
            </PhotoContainer>
          ))}
        </Photos>
      )}
    </Container>
  );
});

const Container = styled.div<{ isToggle: boolean }>`
  grid-area: sharedPhotosMenu;
  display: grid;
  grid-template-rows: ${(props) => (props.isToggle ? "48px 1fr" : "48px")};
  grid-template-columns: 1fr;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;

  margin-bottom: ${(props) => (props.isToggle ? "16px" : "0")};
`;

const Header = styled.div<{ isToggle: boolean }>`
  display: grid;
  grid-template-rows: 20px;
  grid-template-columns: 1fr 20px;
  padding: 14px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const HeaderText = styled.div`
  color: rgba(0, 0, 0, 0.34);
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
`;

const HeaderIcon = styled.div<{ isToggle: boolean }>`
  background-image: url("assets/staticImages.png");
  background-size: 52px 718px;
  background-repeat: no-repeat;

  background-position: ${(props) =>
    props.isToggle ? "-22px -336px" : "0 -314px"};
`;

const Photos = styled.div`
  display: grid;
  grid-template-rows: 1fr;
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

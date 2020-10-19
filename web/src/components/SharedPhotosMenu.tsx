import React, { useState } from "react";
import styled from "styled-components";

export const SharedPhotosMenu = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <Container isToggle={toggle}>
      <Header isToggle={toggle} onClick={() => setToggle(!toggle)}>
        <HeaderText>Udostępnione zdjęcia</HeaderText>
        <HeaderIcon isToggle={toggle} />
      </Header>

      {toggle && (
        <Photos>
          <Photo>a</Photo>
          <Photo>a</Photo>
          <Photo>a</Photo>
          <Photo>a</Photo>
          <Photo>a</Photo>
          <Photo>a</Photo>
        </Photos>
      )}
    </Container>
  );
};

const Container = styled.div<{ isToggle: boolean }>`
  grid-area: sharedPhotosMenu;
  display: grid;
  grid-template-rows: ${(props) => (props.isToggle ? "48px 1fr" : "48px")};
  grid-template-columns: 1fr;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  cursor: pointer;
  margin-bottom: ${(props) => (props.isToggle ? "16px" : "0")};
`;

const Header = styled.div<{ isToggle: boolean }>`
  display: grid;
  grid-template-rows: 20px;
  grid-template-columns: 1fr 20px;
  padding: 14px;

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
  background-color: red;
  transition: transform 0.1s ease-out;
  transform: ${(props) => props.isToggle && "rotate(45deg)"};
`;

const Photos = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto auto auto;
  padding: 0 12px;
  align-items: center;
  grid-gap: 3px 3px;
`;

const Photo = styled.div`
  background-color: red;

  &:before {
    content: "";
    float: left;
    padding-top: 100%;
  }
`;

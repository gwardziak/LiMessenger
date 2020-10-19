import React, { useState } from "react";
import styled from "styled-components";
import { Like } from "../Icons/Like";
import { Magnifier } from "../Icons/Magnifier";
import { PencilUnderline } from "../Icons/PencilUnderline";

export const SettingsMenu = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <Container isToggle={toggle}>
      <Header isToggle={toggle} onClick={() => setToggle(!toggle)}>
        <HeaderText>więcej działań</HeaderText>
        <HeaderIcon isToggle={toggle} />
      </Header>
      {toggle && (
        <>
          <Item>
            <ItemText>Szukaj w konwersacji</ItemText>
            <GrayIconBackground>
              <MagnifierIcon viewBox="0 0 36 36" />
            </GrayIconBackground>
          </Item>
          <Item>
            <ItemText>Edytuj nicki</ItemText>
            <GrayIconBackground>
              <PencilUnderlineIcon viewBox="0 0 36 36" />
            </GrayIconBackground>
          </Item>
          <Item>
            <ItemText>Zmień motyw</ItemText>
            <BlueIconBackground>
              <WhiteDivIcon />
            </BlueIconBackground>
          </Item>
          <Item>
            <ItemText>Zmień ikonę emoji</ItemText>
            <LikeIcon viewBox="0 1 36 36" />
          </Item>
        </>
      )}
    </Container>
  );
};

const Container = styled.div<{ isToggle: boolean }>`
  grid-area: settingsMenu;
  display: grid;
  grid-template-rows: ${(props) =>
    props.isToggle ? "48px 44px 44px 44px 44px" : "48px"};
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

const Item = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 32px;
  padding: 0 12px 0 14px;
  align-items: center;

  &:focus {
    outline-width: 1px;
    outline-color: rgb(16, 16, 16);
  }
`;

const ItemText = styled.div`
  font-size: 14px;
`;

const GrayIconBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 99px;
  box-sizing: border-box;
  height: 32px;
  padding: 5px;
`;

const BlueIconBackground = styled.div`
  background-color: rgb(0, 153, 255);
  border-radius: 99px;
  padding: 8px;
  margin: 4px;
`;

const MagnifierIcon = styled(Magnifier)`
  height: 22px;
  width: 22px;
`;

const PencilUnderlineIcon = styled(PencilUnderline)`
  height: 22px;
  width: 22px;
`;

const LikeIcon = styled(Like)`
  fill: #0099ff;
  height: 32px;
  width: 32px;
`;

const WhiteDivIcon = styled.div`
  background-color: #fff;
  border-radius: 99px;
  height: 8px;
  width: 8px;
`;

import React, { useState } from "react";
import styled from "styled-components";
import { DownArrow } from "../Icons/DownArrow";
import { Like } from "../Icons/Like";
import { Magnifier } from "../Icons/Magnifier";
import { PencilUnderline } from "../Icons/PencilUnderline";
import { UpArrow } from "../Icons/UpArrow";

export const SettingsMenu = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <Container isToggle={toggle}>
      <Header isToggle={toggle} onClick={() => setToggle(!toggle)}>
        <HeaderText>więcej działań</HeaderText>
        {toggle ? <UpArrowIcon /> : <DownArrowIcon />}
      </Header>
      {toggle && (
        <>
          <Item>
            <ItemText>Szukaj w konwersacji</ItemText>
            <GrayIconBackground>
              <MagnifierIcon viewBox="-7 -7 45 45" />
            </GrayIconBackground>
          </Item>
          <Item>
            <ItemText>Edytuj nicki</ItemText>
            <GrayIconBackground>
              <PencilUnderlineIcon viewBox="-100 0 750 500" />
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
            <LikeIcon viewBox="-90 -70 700 700" />
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
  border-top: ${({ theme }) => `1px solid ${theme.divider.color}`};
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
    background-color: ${({ theme }) => theme.item.hover};
  }
`;

const HeaderText = styled.div`
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
`;

const UpArrowIcon = styled(UpArrow)`
  fill: ${({ theme }) => theme.svg.color};
  align-self: center;
  justify-self: center;
  height: 70%;
  width: 70%;
`;

const DownArrowIcon = styled(DownArrow)`
  fill: ${({ theme }) => theme.svg.color};
  align-self: center;
  justify-self: center;
  height: 70%;
  width: 70%;
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
  background-color: ${({ theme }) => theme.svg.background};
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
  fill: ${({ theme }) => theme.svg.color};
  height: 22px;
  width: 22px;
`;

const PencilUnderlineIcon = styled(PencilUnderline)`
  fill: ${({ theme }) => theme.svg.color};
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

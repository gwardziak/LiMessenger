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
      <Header onClick={() => setToggle(!toggle)}>
        <HeaderText>Customise chat</HeaderText>
        {toggle ? <UpArrowIcon /> : <DownArrowIcon />}
      </Header>
      {toggle && (
        <>
          <Item>
            <ItemText>Search in conversation</ItemText>
            <GrayIconBackground>
              <MagnifierIcon />
            </GrayIconBackground>
          </Item>
          <Item>
            <ItemText>Edit nicknames</ItemText>
            <GrayIconBackground>
              <PencilUnderlineIcon />
            </GrayIconBackground>
          </Item>
          <Item>
            <ItemText>Change theme</ItemText>
            <BlueIconBackground>
              <WhiteDivIcon />
            </BlueIconBackground>
          </Item>
          <Item>
            <ItemText>Change emoji</ItemText>
            <LikeIcon />
          </Item>
        </>
      )}
    </Container>
  );
};

const Container = styled.div<{ isToggle: boolean }>`
  grid-area: settingsMenu;
  display: grid;
  grid-template-rows: ${({ isToggle }) =>
    isToggle ? "49px 44px 44px 44px 44px" : "48px"};
  width: 100%;
  cursor: pointer;
  margin-bottom: ${({ isToggle }) => (isToggle ? "16px" : "0")};
  border-top: ${({ theme }) => `1px solid ${theme.divider.color}`};
`;

const Header = styled.div`
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

const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 32px;
  padding: 0 12px 0 14px;
  align-items: center;

  &:focus {
    outline-width: 1px;
    outline-color: rgb(28, 30, 33);
  }
`;

const ItemText = styled.div`
  font-size: 14px;
`;

const GrayIconBackground = styled.div`
  border-radius: 50%;
  box-sizing: border-box;
  height: 32px;
  padding: 5px;

  background-color: ${({ theme }) => theme.svg.background};
`;

const BlueIconBackground = styled.div`
  background-color: rgb(0, 153, 255);
  border-radius: 50%;
  padding: 8px;
  margin: 4px;
`;

const MagnifierIcon = styled(Magnifier)`
  height: 22px;
  width: 22px;

  fill: ${({ theme }) => theme.svg.color};
`;

const PencilUnderlineIcon = styled(PencilUnderline)`
  height: 22px;
  width: 22px;
  fill: ${({ theme }) => theme.svg.color};
`;

const LikeIcon = styled(Like)`
  fill: #0099ff;
  height: 32px;
  width: 32px;
`;

const WhiteDivIcon = styled.div`
  background-color: #fff;
  border-radius: 50%;
  height: 8px;
  width: 8px;
`;

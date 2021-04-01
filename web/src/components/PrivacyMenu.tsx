import React, { useState } from "react";
import styled from "styled-components";
import { Bell } from "../Icons/Bell";
import { DownArrow } from "../Icons/DownArrow";
import { MessageCross } from "../Icons/MessageCross";
import { UpArrow } from "../Icons/UpArrow";
import { CautionTriangle } from "./../Icons/CautionTriangle";
import { MinusCircle } from "./../Icons/MinusCircle";

export const PrivacyMenu = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <Container isToggle={toggle}>
      <Header onClick={() => setToggle(!toggle)}>
        <HeaderText>Privacy and support</HeaderText>
        {toggle ? <UpArrowIcon /> : <DownArrowIcon />}
      </Header>

      {toggle && (
        <>
          <Item>
            <ItemText>Mute conversation</ItemText>
            <GrayIconBackground>
              <BellIcon />
            </GrayIconBackground>
          </Item>
          <Item>
            <ItemText>Ignore messages</ItemText>
            <GrayIconBackground>
              <MessageCrossIcon />
            </GrayIconBackground>
          </Item>
          <Item>
            <ItemText>Block</ItemText>
            <GrayIconBackground>
              <MinusCircleIcon />
            </GrayIconBackground>
          </Item>
          <ItemWithExtraText>
            <ItemText>Something's wrong</ItemText>
            <ItemExtraText>
              Give feedback and report the conversation
            </ItemExtraText>
            <ExtendGrayIconBackground>
              <CautionTriangleIcon />
            </ExtendGrayIconBackground>
          </ItemWithExtraText>
        </>
      )}
    </Container>
  );
};

const Container = styled.div<{ isToggle: boolean }>`
  grid-area: supportMenu;
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

const ItemWithExtraText = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 32px;
  padding: 0 12px 0 14px;
  align-items: center;
  grid-template-areas: ". avatar" ". avatar";

  &:focus {
    outline-width: 1px;
    outline-color: rgb(28, 30, 33);
  }
`;

const ItemExtraText = styled.div`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({ theme }) => theme.text.color.secondary};
`;

const GrayIconBackground = styled.div`
  border-radius: 50%;
  box-sizing: border-box;
  height: 32px;
  padding: 5px;

  background-color: ${({ theme }) => theme.svg.background};
`;

const ExtendGrayIconBackground = styled(GrayIconBackground)`
  grid-area: avatar;
`;

const BellIcon = styled(Bell)`
  height: 22px;
  width: 22px;
  fill: ${({ theme }) => theme.svg.color};
`;

const MessageCrossIcon = styled(MessageCross)`
  height: 22px;
  width: 22px;
  fill: ${({ theme }) => theme.svg.color};
`;

const MinusCircleIcon = styled(MinusCircle)`
  height: 22px;
  width: 22px;
  fill: ${({ theme }) => theme.svg.color};
`;

const CautionTriangleIcon = styled(CautionTriangle)`
  height: 22px;
  width: 22px;
  fill: ${({ theme }) => theme.svg.color};
`;

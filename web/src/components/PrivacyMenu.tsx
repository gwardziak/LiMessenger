import React, { useState } from "react";
import styled from "styled-components";
import { Bell } from "../Icons/Bell";
import { MessageCross } from "../Icons/MessageCross";
import { CautionTriangle } from "./../Icons/CautionTriangle";
import { MinusCircle } from "./../Icons/MinusCircle";

export const PrivacyMenu = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <Container isToggle={toggle}>
      <Header isToggle={toggle} onClick={() => setToggle(!toggle)}>
        <HeaderText>Prywatność i Pomoc</HeaderText>
        <HeaderIcon isToggle={toggle} />
      </Header>

      {toggle && (
        <>
          <Item>
            <ItemText>Powiadomienia</ItemText>
            <GrayIconBackground>
              <BellIcon viewBox="0 0 36 36" />
            </GrayIconBackground>
          </Item>
          <Item>
            <ItemText>Ignoruj wiadomości</ItemText>
            <GrayIconBackground>
              <MessageCrossIcon viewBox="-120 0 750 500" />
            </GrayIconBackground>
          </Item>
          <Item>
            <ItemText>Blokuj wiadomości</ItemText>
            <GrayIconBackground>
              <MinusCircleIcon viewBox="-15 -15 127 127" />
            </GrayIconBackground>
          </Item>
          <ItemWithExtraText>
            <ItemText>Wystąpił błąd</ItemText>
            <ItemExtraText>Przekaż opinię i zgłoś konwersację</ItemExtraText>
            <ExtendGrayIconBackground>
              <CautionTriangleIcon viewBox="0 0 36 36" />
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
  background-repeat: no-repeat;

  background-image: ${(props) =>
    props.isToggle ? "url(assets/up-arrow.png)" : "url(assets/down-arrow.png)"};
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

const ItemWithExtraText = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 32px;
  padding: 0 12px 0 14px;
  align-items: center;
  grid-template-areas: ". avatar" ". avatar";

  &:focus {
    outline-width: 1px;
    outline-color: rgb(16, 16, 16);
  }
`;

const ItemExtraText = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: baseline;
`;

const GrayIconBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 99px;
  box-sizing: border-box;
  height: 32px;
  padding: 5px;
`;

const ExtendGrayIconBackground = styled(GrayIconBackground)`
  grid-area: avatar;
`;

const BellIcon = styled(Bell)`
  height: 22px;
  width: 22px;
`;

const MessageCrossIcon = styled(MessageCross)`
  height: 22px;
  width: 22px;
`;

const MinusCircleIcon = styled(MinusCircle)`
  height: 22px;
  width: 22px;
`;

const CautionTriangleIcon = styled(CautionTriangle)`
  height: 22px;
  width: 22px;
`;

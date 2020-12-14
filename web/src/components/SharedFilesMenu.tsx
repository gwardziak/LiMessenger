import React, { useState } from "react";
import styled from "styled-components";

export const SharedFilesMenu = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <Container isToggle={toggle}>
      <Header isToggle={toggle} onClick={() => setToggle(!toggle)}>
        <HeaderText>Udostępnione pliki</HeaderText>
        <HeaderIcon isToggle={toggle} />
      </Header>

      {toggle && (
        <List>
          <Item>
            <ItemIcon></ItemIcon>
            <ItemText>Plik1234</ItemText>
          </Item>
          <Item>
            <ItemIcon></ItemIcon>
            <ItemText>Plik1234</ItemText>
          </Item>
          <Item>
            <ItemIcon></ItemIcon>
            <ItemText>Plik1234</ItemText>
          </Item>
        </List>
      )}
    </Container>
  );
};

const Container = styled.div<{ isToggle: boolean }>`
  grid-area: sharedFilesMenu;
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
  background-image: url("assets/staticImages.png");
  background-size: 52px 718px;
  background-repeat: no-repeat;

  background-position: ${(props) =>
    props.isToggle ? "-22px -336px" : "0 -314px"};
`;

const List = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  padding: 0 16px;
  list-style-type: none;
  margin: 0;
`;

const Item = styled.li`
  display: grid;
  grid-template-areas: "icon fileName";
  grid-template-columns: 24px 1fr;
  padding: 8px 0;
  line-height: 16px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ItemIcon = styled.div`
  background-color: red;
  width: 16px;
  height: 16px;
`;

const ItemText = styled.div`
  color: #0084ff;
  overflow-wrap: break-word;
  font-size: 14px;
`;

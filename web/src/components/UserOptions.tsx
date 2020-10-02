import React from "react";
import styled from "styled-components";
import { Compose } from "../Icons/Compose";
import { CreateNewRoom } from "../Icons/CreateNewRoom";
import { Settings } from "../Icons/Settings";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
import { mediaQuery } from "../utils/css/cssMedia";

export const UserOptions = () => {
  return (
    <Container>
      <Avatar src="https://scontent-frx5-1.xx.fbcdn.net/v/t31.0-1/cp0/c0.23.60.60a/p60x60/20507795_749401998564414_4605004011507775542_o.jpg?_nc_cat=110&_nc_sid=dbb9e7&_nc_ohc=NE80brTwWOAAX_THZuy&_nc_ht=scontent-frx5-1.xx&_nc_tp=27&oh=5c37d69f5da3863fbfc63c6a6fceda7b&oe=5F9D4E12" />
      <ListName>Czaty</ListName>
      <IconContainer>
        <Settings fill="#000" height="30px" width="30px" viewBox="0 0 36 36" />
      </IconContainer>
      <IconContainer>
        <CreateNewRoom
          fill="#000"
          height="28px"
          width="28px"
          viewBox="0 0 28 28"
        />
      </IconContainer>
      <IconMobileAndDesktopContainer>
        <Compose fill="#000" height="30px" width="30px" viewBox="0 0 36 36" />
      </IconMobileAndDesktopContainer>
    </Container>
  );
};

const Container = styled.div`
  grid-area: userOptions;
  display: grid;
  grid-template-columns: 40px 1fr 36px 36px 36px;
  grid-template-areas: "avatar listName  icon icon icon";
  grid-gap: 12px;
  padding: 10px 16px 10px 16px;
  align-items: center;
  box-sizing: border-box;
  min-width: 300px;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    grid-template-columns: 1fr;
    min-width: 0;
    display: flex;
    justify-content: center;
  }
`;

const Avatar = styled(DefaultAvatar)`
  grid-area: avatar;
  height: 40px;
  width: 40px;
  cursor: pointer;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

const ListName = styled.h1`
  grid-area: listName;
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    display: none;
  }
`;

const IconContainer = styled.div`
  border-radius: 99px;
  background-color: rgba(0, 0, 0, 0.04);
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 36px;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    display: none;
  }
`;

const IconMobileAndDesktopContainer = styled(IconContainer)`
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    display: flex;
    width: 36px;
  }
`;

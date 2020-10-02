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
      <IconsHelper />
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
  display: flex;
  padding: 10px 16px 10px 16px;
  align-items: center;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    justify-content: center;
  }
`;

const Avatar = styled(DefaultAvatar)`
  height: 40px;
  width: 40px;
  margin-right: 12px;
  cursor: pointer;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

const ListName = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  text-overflow: ellipsis;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    display: none;
  }
`;

const IconsHelper = styled.div`
  flex: 1 1 auto;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    display: none;
  }
`;

const IconContainer = styled.div`
  border-radius: 99px;
  background-color: rgba(0, 0, 0, 0.04);
  cursor: pointer;
  height: 36px;
  width: 36px;
  margin-left: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    display: none;
  }
`;

const IconMobileAndDesktopContainer = styled(IconContainer)`
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    display: flex;
    margin: 0;
  }
`;

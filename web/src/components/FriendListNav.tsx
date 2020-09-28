import React from "react";
import styled from "styled-components";
import { Compose } from "../Icons/Compose";
import { CreateNewRoom } from "../Icons/CreateNewRoom";
import { Settings } from "../Icons/Settings";
import { Avatar } from "../ui/Avatar";
import { mediaQuery } from "../utils/css/cssMedia";

export const FriendListNav = () => {
  return (
    <>
      <Container>
        <AvatarContainer>
          <SmallAvatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E" />
        </AvatarContainer>
        <ListTitle>Czaty</ListTitle>
        <IconsHelper />
        <IconContainer>
          <Settings
            fill="black"
            height="30px"
            width="30px"
            viewBox="0 0 36 36"
          />
        </IconContainer>
        <IconContainer>
          <CreateNewRoom
            fill="black"
            height="28px"
            width="28px"
            viewBox="0 0 28 28"
          />
        </IconContainer>
        <IconMobileAndDesktopContainer>
          <Compose
            fill="black"
            height="30px"
            width="30px"
            viewBox="0 0 36 36"
          />
        </IconMobileAndDesktopContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 10px 16px 10px 16px;
  display: flex;
  box-sizing: border-box;
  height: 60px;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    justify-content: center;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  height: 40px;
  margin-right: 12px;
  width: 40px;
  cursor: pointer;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

const SmallAvatar = styled(Avatar)`
  height: 40px;
  width: 40px;
`;

const ListTitle = styled.h1`
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
    margin: 0px;
  }
`;

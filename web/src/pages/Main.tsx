import React from "react";
import styled from "styled-components";
import { FriendList } from "../components/FriendList";
import { Camcorder } from "../Icons/Camcorder";
import { Compose } from "../Icons/Compose";
import { CreateNewRoom } from "../Icons/CreateNewRoom";
import { InfoCircle } from "../Icons/InfoCircle";
import { Phone } from "../Icons/Phone";
import { Settings } from "../Icons/Settings";
import { Avatar } from "../ui/Avatar";
import { mediaQuery } from "../utils/css/cssMedia";

export const Main = () => {
  const users = [1, 2, 3, 4, 5, 5, 6];

  return (
    <Container>
      <LeftContainer>
        <LeftNavContainer>
          <UserAvatarContainer>
            <SmallAvatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E" />
          </UserAvatarContainer>
          <Chats>Czaty</Chats>
          <IconsHelper />
          <LeftNavIconDesktopContainer>
            <Settings
              fill="black"
              height="30px"
              width="30px"
              viewBox="0 0 36 36"
            />
          </LeftNavIconDesktopContainer>
          <LeftNavIconDesktopContainer>
            <CreateNewRoom
              fill="black"
              height="28px"
              width="28px"
              viewBox="0 0 28 28"
            />
          </LeftNavIconDesktopContainer>
          <LeftNavIconMobileAndDesktopContainer>
            <Compose
              fill="black"
              height="30px"
              width="30px"
              viewBox="0 0 36 36"
            />
          </LeftNavIconMobileAndDesktopContainer>
        </LeftNavContainer>
        <AnotherContainer>
          <AnotherOneContainer>
            <AnotherSickContainer>
              <Div></Div>
              <SearchBar placeholder="Szukaj w Messengerze"></SearchBar>
            </AnotherSickContainer>
          </AnotherOneContainer>
          <FriendList />
        </AnotherContainer>
      </LeftContainer>
      <Chat>
        <MiddleNav>
          <MiddleNavUser>
            <NextContForAvatar>
              <SmallAvatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E" />
            </NextContForAvatar>
            <Napisy>Adam Galon</Napisy>
          </MiddleNavUser>
          <NavList>
            <NavListItem>
              <Phone
                fill="#0099ff"
                height="32px"
                width="32px"
                viewBox="0 0 36 36"
              />
            </NavListItem>
            <NavListItem>
              <Camcorder
                fill="#0099ff"
                height="32px"
                width="32px"
                viewBox="0 0 36 36"
              />
            </NavListItem>
            <NavListItem>
              <SelectedIconDiv />
              <InfoCircle
                fill="#0099ff"
                height="32px"
                width="32px"
                viewBox="0 0 36 36"
              />
            </NavListItem>
          </NavList>
        </MiddleNav>
        <AnotherKurwaContainer>
          <MiddleContainer>
            <AnotherKurwaUserContainer>
              <AnotherKurwaUserAvatarContainer>
                <BigAvatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E" />
              </AnotherKurwaUserAvatarContainer>
              <NextDiv>Adam Galon</NextDiv>
            </AnotherKurwaUserContainer>
          </MiddleContainer>
          <RightContainer></RightContainer>
        </AnotherKurwaContainer>
      </Chat>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #fff;
  min-width: 500px;
`;

const LeftContainer = styled.div`
  min-width: 300px;
  max-width: 420px;
  flex: 0 0 25%;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    min-width: 80px;
    max-width: 80px;
  }
`;

const LeftNavContainer = styled.div`
  padding: 10px 16px 10px 16px;
  display: flex;
  box-sizing: border-box;
  height: 60px;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    justify-content: center;
  }
`;

const UserAvatarContainer = styled.div`
  display: flex;
  height: 40px;
  margin-right: 12px;
  width: 40px;
  cursor: pointer;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

const Chats = styled.h1`
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

const LeftNavIconDesktopContainer = styled.div`
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

const LeftNavIconMobileAndDesktopContainer = styled(
  LeftNavIconDesktopContainer
)`
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    display: flex;
    margin: 0px;
  }
`;

const AnotherContainer = styled.div`
  height: 100%;
`;

const AnotherOneContainer = styled.div`
  padding: 4px 16px 12px;
  position: relative;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

const AnotherSickContainer = styled.div`
  position: relative;
`;

const Div = styled.div`
  background: red;
  background-repeat: no-repeat;
  background-size: 222px 902px;
  background-position: -144px -794px;
  content: "";
  display: inline-block;
  height: 16px;
  left: 12px;
  position: absolute;
  top: 10px;
  width: 16px;
`;

const SearchBar = styled.input`
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 50px;
  font-size: 15px;
  height: 36px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 36px;
  padding-right: 16px;
  text-align: left;
  outline: 0;
  box-sizing: border-box;
  margin: 0;
  border-style: none;
  width: 100%;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif;
  }
`;

const MiddleContainer = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  flex: 0 2 33.33%;
  max-width: 420px;
  min-width: 200px;
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: 14px;
`;

const Chat = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
`;

const RightContainer = styled.div`
  flex: 2 0 0%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const MiddleNav = styled.div`
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;

  box-sizing: border-box;
  height: 60px;
  padding: 8px 8px 8px 16px;
  position: relative;
  text-align: center;
  z-index: 201;
`;

const MiddleNavUser = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
`;

const NextContForAvatar = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 2px;
  margin-right: 12px;
`;

const Napisy = styled.h2`
  font-size: 15px;
  font-weight: bold;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 32px;
  justify-content: center;
`;

const NavList = styled.ul`
  display: flex;
  padding: 9px 0 9px 8px;
  line-height: 0;
  list-style-type: none;
  margin: 0;
  cursor: pointer;
`;

const NavListItem = styled.li`
  display: inline-block;
  margin-right: 12px;

  :last-child {
    margin-right: 0px;
  }
`;

const SelectedIconDiv = styled.div`
  background-color: rgb(0, 153, 255);
  border-radius: 99px;
  height: 32px;
  position: absolute;
  width: 32px;
  opacity: 0.2;
`;

const SmallAvatar = styled(Avatar)`
  height: 40px;
  width: 40px;
`;

const BigAvatar = styled(Avatar)`
  height: 100px;
  width: 100px;
`;

const AnotherKurwaContainer = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: row-reverse;
`;

const AnotherKurwaUserContainer = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
  padding: 0 14px 16px 14px;
  word-break: break-word;
`;

const AnotherKurwaUserAvatarContainer = styled.div`
  height: 100px;
  width: 100px;
`;

const NextDiv = styled.div`
  align-items: center;
  flex: 1 1 auto;
  margin-left: 0;
  margin-top: 12px;
  color: #000;
  display: flex;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

import React from "react";
import styled from "styled-components";
import { Avatar } from "../ui/Avatar";

export const UserDetails = () => {
  return (
    <>
      <Container>
        <UserInfoContainer>
          <AvatarContainer>
            <BigAvatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E" />
          </AvatarContainer>
          <Username>Adam Galon</Username>
          <LastSeenInfo>Aktywny(a) 1 godz. temu</LastSeenInfo>
        </UserInfoContainer>
        <DropDownMenuContainer>
          <BorderTop />
          <MenuName>
            Więcej działań
            <ToggleShowMoreImg />
          </MenuName>
        </DropDownMenuContainer>
        <DropDownMenuContainer>
          <BorderTop />
          <MenuName>
            Prywatność i pomoc
            <ToggleShowMoreImg />
          </MenuName>
        </DropDownMenuContainer>
        <DropDownMenuContainer>
          <BorderTop />
          <MenuName>
            Udostępnione pliki
            <ToggleShowMoreImg />
          </MenuName>
        </DropDownMenuContainer>
        <DropDownMenuContainer>
          <BorderTop />
          <MenuName>
            udostępnione zdjęcia
            <ToggleShowMoreImg />
          </MenuName>
        </DropDownMenuContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  flex: 0 2 33.33%;
  max-width: 420px;
  min-width: 200px;
  box-sizing: border-box;
  padding-top: 14px;
  text-align: center;
`;

const UserInfoContainer = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
  padding: 0 14px 16px 14px;
  word-break: break-word;
`;

const AvatarContainer = styled.div`
  height: 100px;
  width: 100px;
`;

const BigAvatar = styled(Avatar)`
  height: 100px;
  width: 100px;
`;

const Username = styled.div`
  margin-left: 0;
  margin-top: 12px;
  font-size: 20px;
  font-weight: bold;
`;

const LastSeenInfo = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  margin-top: 2px;
`;

const DropDownMenuContainer = styled.div``;

const BorderTop = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const MenuName = styled.h4`
  margin: 0;
  color: rgba(0, 0, 0, 0.34);
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  padding: 14px;
  line-height: 1.28;
  justify-content: space-between;
`;

const ToggleShowMoreImg = styled.img`
  height: 20px;
  width: 20px;
`;

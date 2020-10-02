import React from "react";
import styled from "styled-components";
import { Camcorder } from "../Icons/Camcorder";
import { InfoCircle } from "../Icons/InfoCircle";
import { Phone } from "../Icons/Phone";
import { Avatar as DefaultAvatar } from "../ui/Avatar";

export const Navbar = () => {
  return (
    <Container>
      <UserContainer>
        <SmallAvatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E" />
        <Username>Adam Galon</Username>
      </UserContainer>
      <IconList>
        <Icon>
          <Phone
            fill="#0099ff"
            height="32px"
            width="32px"
            viewBox="0 0 36 36"
          />
        </Icon>
        <Icon>
          <Camcorder
            fill="#0099ff"
            height="32px"
            width="32px"
            viewBox="0 0 36 36"
          />
        </Icon>
        <Icon>
          <SelectedIconHelper />
          <InfoCircle
            fill="#0099ff"
            height="32px"
            width="32px"
            viewBox="0 0 36 36"
          />
        </Icon>
      </IconList>
    </Container>
  );
};

const Container = styled.div`
  grid-area: nav;
  display: flex;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px 8px 8px 16px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SmallAvatar = styled(DefaultAvatar)`
  height: 40px;
  width: 40px;
  margin-left: 2px;
  margin-right: 12px;
`;

const Username = styled.h2`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  height: 32px;
  justify-content: center;
`;

const IconList = styled.ul`
  display: flex;
  padding: 9px 0 9px 8px;
  line-height: 0;
  cursor: pointer;
  align-items: center;
`;

const Icon = styled.li`
  display: inline-block;
  margin-right: 12px;
  :last-child {
    margin-right: 0px;
  }
`;

const SelectedIconHelper = styled.div`
  background-color: rgb(0, 153, 255);
  border-radius: 99px;
  height: 32px;
  position: absolute;
  width: 32px;
  opacity: 0.2;
`;

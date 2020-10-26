import React from "react";
import styled from "styled-components";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
import { MyScrollbar } from "../utils/Scrollbar";
import { PrivacyMenu } from "./PrivacyMenu";
import { SettingsMenu } from "./SettingsMenu";
import { SharedFilesMenu } from "./SharedFilesMenu";
import { SharedPhotosMenu } from "./SharedPhotosMenu";

export const ChatRoomOptions = () => {
  return (
    <StyledScrollbar autoHide noScrollX>
      <Container>
        <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E" />
        <Username>Tomasz </Username>
        <Activity>Aktywny(a) 1 godz. temu</Activity>
        <SettingsMenu />
        <PrivacyMenu />
        <SharedFilesMenu />
        <SharedPhotosMenu />
      </Container>
    </StyledScrollbar>
  );
};

const Container = styled.div`
  grid-area: chatRoomOptions;
  display: grid;
  grid-template-rows: 100px auto auto auto auto auto auto;
  grid-template-columns: minmax(200px, 420px);
  grid-template-areas: "avatar" "username" "activity" "settingsMenu" "supportMenu" "sharedFilesMenu" "sharedPhotosMenu";
  padding-top: 14px;
  justify-items: center;
`;

const Avatar = styled(DefaultAvatar)`
  grid-area: avatar;
  height: 100px;
  width: 100px;
`;

const Username = styled.div`
  grid-area: username;
  margin-top: 12px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Activity = styled.div`
  grid-area: activity;
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  margin-top: 2px;
  padding-bottom: 16px;
`;

const StyledScrollbar = styled(MyScrollbar)`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

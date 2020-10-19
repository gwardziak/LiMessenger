import React from "react";
import styled from "styled-components";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
import Scrollbar from "../utils/Scrollbar";
import { PrivacyMenu } from "./PrivacyMenu";
import { SettingsMenu } from "./SettingsMenu";
import { SharedFilesMenu } from "./SharedFilesMenu";
import { SharedPhotosMenu } from "./SharedPhotosMenu";

export const ChatRoomOptions = () => {
  return (
    <StyledScrollbar autoHide noScrollX>
      <Container>
        <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-1/p160x160/1908321_487589871394123_3669658637878936630_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_ohc=fX3Wq6Pwg5UAX8QAER2&_nc_ht=scontent-frt3-1.xx&tp=6&oh=a67de794600c2ca4b89e0074f77c22d9&oe=5FA35242" />
        <Username>Tomasz Grzyb Martyński </Username>
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

const StyledScrollbar = styled(Scrollbar)`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

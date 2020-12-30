import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import Scrollbar from "react-scrollbars-custom";
import styled from "styled-components";
import { useRootStore } from "../stores/RootStore";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
import { MyScrollbar } from "../utils/Scrollbar";
import { PrivacyMenu } from "./PrivacyMenu";
import { SettingsMenu } from "./SettingsMenu";
import { SharedFilesMenu } from "./SharedFilesMenu";
import { SharedPhotosMenu } from "./SharedPhotosMenu";

export const ChatRoomOptions = observer(() => {
  const rootStore = useRootStore();
  const scrollbarRef = useRef<Scrollbar>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const activeChat = rootStore.chatStore.activeChat!;

  const handleLoadMore = async () => {
    const scroll = scrollbarRef.current;
    const roomId = rootStore.chatStore.activeChat;
    const room = rootStore.attachmentsStore.imagesInfo.get(roomId ?? "");

    if (!scroll || !room) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = scroll;

    if (
      isOpen &&
      scrollTop / (scrollHeight - clientHeight) > 0.95 &&
      !isFetching &&
      room.hasMore
    ) {
      console.log("Fetching new images");
      try {
        setIsFetching(true);
        await rootStore.attachmentsStore.fetchAttachments(true);
        setIsFetching(false);
        console.log("Done fetching images");
      } catch (ex) {
        console.log("Error during fetching messages", ex.message);
      }
    }
  };

  return (
    <StyledScrollbar
      autoHide
      noScrollX
      elementRef={scrollbarRef}
      onUpdate={(e: React.ChangeEvent<HTMLInputElement>) => handleLoadMore()}
    >
      <Container>
        <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E" />
        <Username>{rootStore.chatStore.recipientName}</Username>
        <Activity>Aktywny(a) 1 godz. temu</Activity>
        <SettingsMenu />
        <PrivacyMenu />
        {rootStore.attachmentsStore.files.get(activeChat)?.length! > 0 && (
          <SharedFilesMenu />
        )}
        {rootStore.attachmentsStore.images.get(activeChat)?.length! > 0 && (
          <SharedPhotosMenu setIsOpen={setIsOpen} isOpen={isOpen} />
        )}
      </Container>
    </StyledScrollbar>
  );
});

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

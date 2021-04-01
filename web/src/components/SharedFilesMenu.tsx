import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styled from "styled-components";
import { DownArrow } from "../Icons/DownArrow";
import { File } from "../Icons/File";
import { UpArrow } from "../Icons/UpArrow";
import { useRootStore } from "../stores/RootStore";

export const SharedFilesMenu = observer(() => {
  const rootStore = useRootStore();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const roomId = rootStore.chatStore.activeChat;
  const fileInfo = rootStore.attachmentsStore.filesInfo.get(roomId ?? "");

  const handleLoadMore = async () => {
    if (!fileInfo) {
      return;
    }

    if (!isFetching && fileInfo.hasMore) {
      try {
        setIsFetching(true);
        await rootStore.attachmentsStore.fetchAttachments(false);
        setIsFetching(false);
        console.log("Done fetching");
      } catch (ex) {
        console.log("Error during fetching messages", ex.message);
      }
    }
  };

  return (
    <Container isToggle={toggle}>
      <Header onClick={() => setToggle(!toggle)}>
        <HeaderText>Shared files</HeaderText>
        {toggle ? <UpArrowIcon /> : <DownArrowIcon />}
      </Header>

      {toggle && (
        <List>
          {rootStore.attachmentsStore.fileAttachments.map((file) => (
            <Item key={file.uuid} href={`http://localhost:4000/${file.link}`}>
              <FileIcon />
              <ItemText>{file.name}</ItemText>
            </Item>
          ))}

          {fileInfo?.hasMore && (
            <ShowMore onClick={handleLoadMore}>Show More</ShowMore>
          )}
        </List>
      )}
    </Container>
  );
});

const Container = styled.div<{ isToggle: boolean }>`
  grid-area: sharedFilesMenu;
  display: grid;
  grid-template-rows: ${(props) => (props.isToggle ? "49px 1fr" : "48px")};
  width: 100%;
  cursor: pointer;

  margin-bottom: ${({ isToggle }) => (isToggle ? "16px" : "0")};
  border-top: ${({ theme }) => `1px solid ${theme.divider.color}`};
`;

const Header = styled.div`
  display: grid;
  grid-template-rows: 20px;
  grid-template-columns: 1fr 20px;
  padding: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.item.hover};
  }
`;

const HeaderText = styled.div`
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
`;

const List = styled.ul`
  padding: 0 16px;
  margin: 0;
`;

const Item = styled.a`
  display: grid;
  grid-template-areas: "icon fileName";
  grid-template-columns: 24px 1fr;
  padding: 8px 0;
  grid-column-gap: 4px;
  text-decoration: none;
  &:hover {
    background-color: ${({ theme }) => theme.item.hover};
  }
`;

const UpArrowIcon = styled(UpArrow)`
  align-self: center;
  justify-self: center;
  height: 70%;
  width: 70%;

  fill: ${({ theme }) => theme.svg.color};
`;

const DownArrowIcon = styled(DownArrow)`
  align-self: center;
  justify-self: center;
  height: 70%;
  width: 70%;

  fill: ${({ theme }) => theme.svg.color};
`;

const FileIcon = styled(File)`
  align-self: center;
  margin-left: 2px;
  width: 100%;
  height: 22px;
  fill: ${({ theme }) => theme.text.color.primary};
`;

const ItemText = styled.div`
  overflow-wrap: break-word;
  font-size: 15px;
  font-weight: 500;

  color: ${({ theme }) => theme.text.color.primary};
`;

const ShowMore = styled.div`
  width: fit-content;
  &:hover {
    background-color: ${({ theme }) => theme.item.hover};
  }
`;

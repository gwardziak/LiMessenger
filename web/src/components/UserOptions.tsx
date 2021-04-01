import { observer } from "mobx-react-lite";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSignOutMutation } from "../generated/graphql";
import { Compose } from "../Icons/Compose";
import { CreateNewRoom } from "../Icons/CreateNewRoom";
import { Settings } from "../Icons/Settings";
import { useRootStore } from "../stores/RootStore";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
import { mediaQuery } from "../utils/css/cssMedia";

export const UserOptions = observer(() => {
  const rootStore = useRootStore();
  const history = useHistory();
  const [, signOut] = useSignOutMutation();

  if (!rootStore.userStore.avatar) {
    return <div>Loading...</div>;
  }

  const logout = async () => {
    const response = await signOut();

    if (response.error) {
      console.log(response.error);
    } else {
      localStorage.removeItem("authToken");
      await rootStore.chatStore.unsubsribeChat();
      rootStore.userStore.resetStore();
      rootStore.chatStore.resetStore();
      rootStore.attachmentsStore.resetStore();

      history.replace("/login");
    }
  };

  return (
    <Container>
      <Avatar src="assets/defaultAvatar.svg" />
      <ListName>Czaty</ListName>
      <IconContainer>
        <SettingsIcon viewBox="-25 -25 175 175" />
      </IconContainer>
      <IconContainer>
        <CreateNewRoomIcon viewBox="0 0 28 28" />
      </IconContainer>
      <IconMobileAndDesktopContainer>
        <ComposeIcon viewBox="0 0 36 36" onClick={() => logout()} />
      </IconMobileAndDesktopContainer>
    </Container>
  );
});

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

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
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

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

const IconContainer = styled.div`
  border-radius: 99px;
  background-color: ${({ theme }) => theme.svg.background};
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 36px;

  &:hover {
    background-color: ${({ theme }) => theme.svg.hover};
  }

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

const IconMobileAndDesktopContainer = styled(IconContainer)`
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: flex;
    width: 36px;
  }
`;

const SettingsIcon = styled(Settings)`
  height: 30px;
  width: 30px;
  fill: ${({ theme }) => theme.svg.color};
  cursor: pointer;
`;

const CreateNewRoomIcon = styled(CreateNewRoom)`
  height: 28px;
  width: 28px;
  fill: ${({ theme }) => theme.svg.color};
  cursor: pointer;
`;

const ComposeIcon = styled(Compose)`
  height: 30px;
  width: 30px;
  fill: ${({ theme }) => theme.svg.color};
  cursor: pointer;
`;

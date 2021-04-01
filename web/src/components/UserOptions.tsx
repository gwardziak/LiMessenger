import { observer } from "mobx-react-lite";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSignOutMutation } from "../generated/graphql";
import { Compose } from "../Icons/Compose";
import { CreateNewRoom } from "../Icons/CreateNewRoom";
import { Settings } from "../Icons/Settings";
import { useRootStore } from "../stores/RootStore";
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
      <ListName>Chats</ListName>
      <IconContainer>
        <SettingsIcon />
      </IconContainer>
      <IconContainer>
        <CreateNewRoomIcon />
      </IconContainer>
      <IconMobileAndDesktopContainer>
        <ComposeIcon onClick={() => logout()} />
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
    display: flex;
    justify-content: center;
    min-width: 0;
  }
`;

const Avatar = styled.img`
  grid-area: avatar;
  border-radius: 50%;
  height: 40px;
  width: 40px;

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
  display: grid;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.svg.background};

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
`;

const CreateNewRoomIcon = styled(CreateNewRoom)`
  height: 28px;
  width: 28px;
  fill: ${({ theme }) => theme.svg.color};
`;

const ComposeIcon = styled(Compose)`
  height: 30px;
  width: 30px;
  fill: ${({ theme }) => theme.svg.color};
`;

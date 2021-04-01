import React, { forwardRef } from "react";
import { useKeyPressEvent } from "react-use";
import styled from "styled-components";
import { CombinedError } from "urql";
import { FindUserQuery } from "../generated/graphql";
import { useRootStore } from "../stores/RootStore";
import { mediaQuery } from "../utils/css/cssMedia";
import { useMatchesMediaQuery } from "../utils/css/useMatchesMediaQuery";

type SearchListProps = {
  setIsVisible(val: boolean): void;
  data: FindUserQuery | undefined;
  error: CombinedError | undefined;
};

export const SearchList = forwardRef<HTMLUListElement, SearchListProps>(
  ({ setIsVisible, data, error }, ref) => {
    const rootStore = useRootStore();
    const isBg = useMatchesMediaQuery([mediaQuery.bg]);

    useKeyPressEvent("Escape", () => {
      setIsVisible(false);
    });

    if (!isBg) {
      setIsVisible(false);
    }

    if (error) {
      return <div>Error during searchring for new friends</div>;
    }

    if (data?.findUser.length === 0) {
      return <UserNotFound>No matching account have been found.</UserNotFound>;
    }

    return (
      <Container ref={ref}>
        {data?.findUser.map((user) => (
          <Item
            key={user.uuid}
            onClick={() => {
              rootStore.chatStore.setChatroom(user.uuid);
              rootStore.chatStore.setFriendName(user.username);
            }}
          >
            <Avatar src="assets/defaultAvatar.svg" />
            <Username>{user.username}</Username>
          </Item>
        ))}
      </Container>
    );
  }
);

const Container = styled.ul`
  margin: 0 8px;
  padding: 0;
`;

const Item = styled.li`
  display: grid;
  grid-template-areas: "avatar username" "avatar message";
  grid-template-rows: 52px;
  grid-template-columns: 36px 1fr;
  grid-column-gap: 12px;
  padding: 0 8px;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.item.hover};
  }

  //hide on small screen anyway
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-template-rows: 64px;
    grid-template-columns: 62.2px;
    grid-template-areas: "avatar";
    justify-items: center;
    padding: 0;
  }
`;

const Avatar = styled.img`
  grid-area: avatar;
  border-radius: 50%;
  height: 36px;
  width: 36px;
`;

const Username = styled.div`
  grid-area: username;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  //hide on small screen anyway
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

const UserNotFound = styled.div`
  display: grid;
  justify-content: center;
`;

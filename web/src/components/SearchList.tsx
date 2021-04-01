import React, { forwardRef } from "react";
import { useKeyPressEvent } from "react-use";
import styled from "styled-components";
import { CombinedError } from "urql";
import { FindUserQuery } from "../generated/graphql";
import { useRootStore } from "../stores/RootStore";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
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
    /* TODO
        {data?.findUser.length === 0 && (
          <div>No users matching search criteria</div>
        )} */

    if (error) {
      return <div>Error during searchring for new friends</div>;
    }

    if (data?.findUser.length === 0) {
      return <div>No users matching search criteria</div>;
    }

    return (
      <Container ref={ref}>
        {data?.findUser.map((user) => (
          <Item
            key={user.uuid}
            isSearch={true}
            onClick={() => {
              rootStore.chatStore.setChatroom(user.uuid);
              rootStore.chatStore.setFriendName(user.username);
            }}
          >
            <Avatar isSearch={true} src="assets/defaultAvatar.svg"></Avatar>
            <Username isSearch={true}>{user.username}</Username>
          </Item>
        ))}
      </Container>
    );
  }
);

const Container = styled.ul`
  display: grid;
  list-style-type: none;
  margin: 0 8px;
  padding: 0;
`;

const Item = styled.li<{ isActive?: boolean; isSearch?: boolean }>`
  display: grid;
  grid-template-areas: "avatar username" "avatar message";
  grid-template-rows: ${(props) => (props.isSearch ? "52px" : "32px 32px")};
  grid-template-columns: ${(props) =>
    props.isSearch ? "36px 1fr" : "50px 1fr"};
  grid-column-gap: 12px;
  padding: 0 8px;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.isActive && props.theme.item.select};
  border-radius: ${(props) => props.isActive && "10px"};

  &:hover {
    background-color: ${({ theme }) => theme.item.hover};
    border-radius: 10px;
  }

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-template-rows: 64px;
    grid-template-columns: 62.2px;
    grid-template-areas: "avatar";
    justify-items: center;
    padding: 0;
  }
`;

const Avatar = styled(DefaultAvatar)<{ isSearch?: boolean }>`
  grid-area: avatar;
  height: ${(props) => props.isSearch && "36px"};
  width: ${(props) => props.isSearch && "36px"};
`;

const Username = styled.div<{ isSearch?: boolean }>`
  grid-area: username;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: ${(props) => (props.isSearch ? "none" : "flex-end")};
  overflow: hidden;
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

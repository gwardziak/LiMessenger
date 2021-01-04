// useKeyPressEvent("Escape", () => {
//   props.setIsVisible(false);
// });

import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";
import styled from "styled-components";
import { useFindUserQuery } from "../generated/graphql";
import { mediaQuery } from "../utils/css/cssMedia";
import { useMatchesMediaQuery } from "../utils/css/useMatchesMediaQuery";
import { MyScrollbar } from "../utils/Scrollbar";
import { SearchBar } from "./SearchBar";
import { SearchList } from "./SearchList";

export const LeftPanel = () => {
  const isBg = useMatchesMediaQuery([mediaQuery.bg]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const searchListRef = useRef(null);
  const [{ data, error }, update] = useFindUserQuery({
    variables: { phase: input },
    pause: true,
  });

  useClickAway(searchListRef, () => {
    console.log("OUTSIDE CLICKED");
  });

  return (
    <MyScrollbar autoHide noScrollX>
      <Container>
        {isBg && (
          <SearchBar
            update={update}
            input={input}
            setInput={setInput}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
          />
        )}
        <SearchList ref={searchListRef} data={data} />
      </Container>
    </MyScrollbar>
  );
};

const Container = styled.div`
  grid-area: friendList;
  display: grid;
  grid-template-rows: 36px 1fr;
  grid-row-gap: 16px;
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-template-rows: 64px;
  }
`;

const List = styled.ul`
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
  background-color: ${(props) => props.isActive && "rgba(0, 0, 0, 0.04)"};
  border-radius: ${(props) => props.isActive && "10px"};

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
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

const Message = styled.div`
  grid-area: message;
  font-size: 13px;
  color: rgb(153, 153, 153);
  align-self: flex-start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

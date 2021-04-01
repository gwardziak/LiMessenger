import { OperationContext } from "@urql/core";
import React from "react";
import styled from "styled-components";
import { Magnifier } from "../Icons/Magnifier";

type SearchBarType = {
  input: string;
  setInput(val: string): void;
  isVisible?: boolean;
  setIsVisible?: (val: boolean) => void;
  update(opts?: Partial<OperationContext> | undefined): void;
};

export const SearchBar = ({
  update,
  input,
  setInput,
  isVisible,
  setIsVisible,
}: SearchBarType) => {
  const timeout = 1000;
  let timer: number;

  // // when user is pressing down on keys, clear the timeout
  function handleKeyPress() {
    clearTimeout(timer);
    console.log("typing..");
  }

  function handleKeyDown() {
    clearTimeout(timer);
    console.log("Key down");
  }

  // when the user has stopped pressing on keys, set the timeout
  // if the user presses on keys before the timeout is reached, then this timeout is canceled
  function handleKeyUp() {
    clearTimeout(timer); // prevent errant multiple timeouts from being generated
    if (input === "") {
      console.log("when it fires");
      setIsVisible!(false);
      return;
    }

    timer = setTimeout(() => {
      update({ requestPolicy: "network-only" });
      setIsVisible!(true);
      console.log("Sent Req");
    }, timeout);
  }

  return (
    <Container>
      <MagnifierIcon />
      <SearchBarInput
        placeholder="Search Messenger"
        name="SearchInput"
        autoComplete="off"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyUp={handleKeyUp}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 4px 16px 0;
  position: relative;
`;

const MagnifierIcon = styled(Magnifier)`
  position: absolute;
  top: 6px;
  left: 6px;
  height: 24px;
  width: 24px;
  fill: ${({ theme }) => theme.input.placeholder};
`;

const SearchBarInput = styled.input`
  border-radius: 50px;
  font-size: 15px;
  padding: 0px 16px 0px 36px;
  outline: 0;
  border-style: none;
  height: 36px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.input.background};
  color: ${({ theme }) => theme.input.color};

  &::placeholder {
    font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif;
    color: ${({ theme }) => theme.input.placeholder};
  }
`;

import { OperationContext } from "@urql/core";
import React from "react";
import styled from "styled-components";

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
      <SearchBarInput
        placeholder="Szukaj w Messengerze"
        name="SearchInput"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyUp={handleKeyUp}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
      />
      <MagnifierImg title="magnifierImg" />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin: 4px 16px 0;
`;

const MagnifierImg = styled.div`
  height: 16px;
  width: 16px;
  top: 10px;
  left: 12px;
  position: absolute;

  background-position: 0 -668px;
  background-image: url("assets/staticImages.png");
  background-size: 52px 718px;
  background-repeat: no-repeat;
`;

const SearchBarInput = styled.input`
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 50px;
  font-size: 15px;
  padding: 0px 16px 0px 36px;
  text-align: left;
  outline: 0;
  border-style: none;
  height: 36px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif;
  }
`;

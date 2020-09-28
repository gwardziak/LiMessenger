import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../utils/css/cssMedia";

export const SearchBar = () => {
  return (
    <>
      <Container>
        <MagnifierImg />
        <SearchBarInput placeholder="Szukaj w Messengerze" />
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 4px 16px 12px;
  position: relative;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

const MagnifierImg = styled.div`
  position: absolute;
  top: 14px;
  left: 28px;
  height: 16px;
  width: 16px;
  background: red;
`;

const SearchBarInput = styled.input`
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 50px;
  font-size: 15px;
  height: 36px;
  padding: 0px 16px 0px 36px;
  text-align: left;
  outline: 0;
  box-sizing: border-box;
  border-style: none;
  width: 100%;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif;
  }
`;

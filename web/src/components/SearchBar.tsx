import React from "react";
import styled from "styled-components";

export const SearchBar = () => {
  return (
    <Container>
      <SearchBarInput placeholder="Szukaj w Messengerze" />
      <MagnifierImg />
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
  background: red;
  position: absolute;
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

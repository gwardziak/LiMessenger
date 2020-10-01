import React from "react";
import styled from "styled-components";

export const NotFound = () => {
  return (
    <>
      <Container>
        <Input></Input>
        <Div></Div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #fff;
  min-width: 500px;
`;

const Input = styled.input`
  background-color: #fff;
  flex: 1 1;
  word-break: break-word;
`;

const Div = styled.div`
  background-color: red;
  width: 20px;
`;

import React from "react";
import styled from "styled-components";

export const NotFound = () => {
  console.log("Not found page");
  return (
    <Container>
      <p>Page doesn't exist</p>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  justify-content: center;
`;

import React from "react";
import styled from "styled-components";

export const Navbar = () => {
  return (
    <NavbarContainer>
      <p>Logo</p>
      <p>Search</p>
      <p>Icons</p>
      <p>User</p>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

export const Link = styled(RouterLink)`
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  color: #1c1e21;

  :visited {
    text-decoration: none;
  }

  :hover {
    text-decoration: underline;
  }
`;

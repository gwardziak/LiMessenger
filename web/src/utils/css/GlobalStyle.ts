import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html {
  height:100%;
}
body {
  height:100%;
  margin: 0;
  padding: 0;
  font-family: SFUIDisplay-Regular, Helvetica Neue, system-ui, Segoe UI, Helvetica, Arial, sans-serif;

  background: ${({ theme }) => theme.body.background};
  color: ${({ theme }) => theme.text.color.primary};
}
`;

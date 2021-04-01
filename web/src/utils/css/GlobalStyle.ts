import { createGlobalStyle } from "styled-components";
import { Theme } from "./themes";

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
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

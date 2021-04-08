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


 -webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Safari */
-khtml-user-select: none; /* Konqueror HTML */
-moz-user-select: none; /* Old versions of Firefox */
-ms-user-select: none; /* Internet Explorer/Edge */
user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */



  background: ${({ theme }) => theme.body.background};
  color: ${({ theme }) => theme.text.color.primary};
}
`;

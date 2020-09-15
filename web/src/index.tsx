import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { createClient, Provider } from "urql";
import App from "./App";
import { RouteProvider } from "./router";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;


  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
`;

const client = createClient({
  url: "http://localhost:4000",
  requestPolicy: "cache-and-network",
  fetchOptions: {
    credentials: "include",
    mode: "cors",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider value={client}>
      <RouteProvider>
        <App />
      </RouteProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

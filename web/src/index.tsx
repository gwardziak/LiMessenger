import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { createClient, Provider } from "urql";
import App from "./App";

const GlobalStyle = createGlobalStyle`
html {
  height:100%;
}

body {
  height:100%;
  margin: 0;
  padding: 0;
  font-family: SFUIDisplay-Regular, Helvetica Neue, system-ui, Segoe UI, Helvetica, Arial, sans-serif;
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
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

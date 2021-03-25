import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { SubscriptionClient } from "subscriptions-transport-ws/dist/client";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  Provider,
  subscriptionExchange,
} from "urql";
import App from "./App";
import { RootStore } from "./stores/RootStore";
import fileExchange from "./utils/fileExchange";

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

const url = "http://localhost:4000/graphql";

const subscriptionClient = new SubscriptionClient(
  url.replace("https://", "wss://").replace("http://", "ws://"),
  {
    reconnect: true,
  }
);

const client = createClient({
  url,
  requestPolicy: "network-only",
  fetchOptions: () => {
    const token = localStorage.getItem("authToken");
    return {
      headers: { "auth-token": `${token}` },
      credentials: "include",
      mode: "cors",
    };
  },

  exchanges: [
    dedupExchange,
    cacheExchange,
    fileExchange,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
      enableAllOperations: true,
    }),
  ],
});

export const StoreContext = createContext<RootStore>(
  new RootStore(client, subscriptionClient)
);

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

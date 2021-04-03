import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
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
import { GlobalStyle } from "./utils/css/GlobalStyle";
import fileExchange from "./utils/fileExchange";
import { loadTheme } from "./utils/loadTheme";

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
    <Provider value={client}>
      <Router>
        <ThemeProvider theme={loadTheme()}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

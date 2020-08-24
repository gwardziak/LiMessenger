import React from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { Client, defaultExchanges, Provider, subscriptionExchange } from "urql";
import { Test } from "./components/Test";

const subscriptionClient = new SubscriptionClient(
  "ws://localhost:4000/graphql",
  {
    reconnect: true,
    timeout: 20000,
  }
);

const client = new Client({
  url: "http://localhost:4000",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
});

function App() {
  return (
    <Provider value={client}>
      <div className="App">
        <Test />
      </div>
    </Provider>
  );
}

export default App;

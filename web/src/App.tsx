import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { ForgotCredentials } from "./pages/ForgotCredentials";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { useRootStore } from "./stores/RootStore";

const App = observer(() => {
  const rootStore = useRootStore();
  const history = useHistory();
  const location = useLocation();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    rootStore.subscriptionClient.client.addEventListener("open", async () => {
      console.log("Open websocket connection");
      console.log("authorizing");
      await rootStore.userStore.fetchMe();

      if (rootStore.userStore.isAuthenticated) {
        history.replace("/");
      }

      if (!rootStore.userStore.isAuthenticated && location.pathname === "/") {
        history.replace("/login");
      }

      setIsAuthorizing(false);
    });

    rootStore.subscriptionClient.client.addEventListener("err", () => {
      console.log("err in websocket");
      rootStore.userStore.setIsAuth(false);
      history.replace("/login");
    });

    rootStore.subscriptionClient.client.addEventListener("close", () => {
      rootStore.userStore.setIsAuth(false);
      console.log("close websocket connection");
      history.replace("/login");
    });
  }, [rootStore, history, location]);

  if (isAuthorizing) {
    return <div>Authorizing...</div>;
  }

  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/forgot-password">
        <ForgotCredentials />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/">
        <NotFound />
      </Route>
    </Switch>
  );
});

export default App;

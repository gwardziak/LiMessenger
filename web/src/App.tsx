import React from "react";
import { Route, Switch } from "react-router-dom";
import { ForgotCredentials } from "./pages/ForgotCredentials";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { useIsAuth } from "./utils/useIsAuth";

function App() {
  useIsAuth();

  return (
    <>
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
    </>
  );
}

export default App;

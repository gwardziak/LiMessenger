import React from "react";
import { ForgotCredentials } from "./pages/ForgotCredentials";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { useRoute } from "./router";

function App() {
  const route = useRoute();
  return (
    <>
      {route.name === "landing" && <Login route={route} />}
      {route.name === "main" && <Main route={route} />}
      {route.name === "register" && <Register route={route} />}
      {route.name === "forgotCredentials" && (
        <ForgotCredentials route={route} />
      )}
      {route.name === false && <NotFound />}
    </>
  );
}

export default App;

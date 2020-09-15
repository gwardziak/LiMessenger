import React from "react";
import { ForgotCredentials } from "./components/ForgotCredentials";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { useRoute } from "./router";

function App() {
  const route = useRoute();

  return (
    <>
      {route.name === "landing" && <Login />}
      {route.name === "register" && <Register route={route} />}
      {route.name === "forgotCredentials" && (
        <ForgotCredentials route={route} />
      )}
      {route.name === false && "Not Found"}
    </>
  );
}

export default App;

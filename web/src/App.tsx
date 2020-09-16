import React from "react";
import { ForgotCredentials } from "./pages/components/ForgotCredentials";
import { Login } from "./pages/components/Login";
import { Main } from "./pages/components/Main";
import { NotFound } from "./pages/components/NotFound";
import { Register } from "./pages/components/Register";
import { useRoute } from "./router";

function App() {
  const route = useRoute();
  const user = !true;
  return (
    <>
      {(route.name === "landing" && user && <Main route={route} />) ||
        (route.name === "landing" && <Login route={route} />)}
      {route.name === "register" && <Register route={route} />}
      {route.name === "forgotCredentials" && (
        <ForgotCredentials route={route} />
      )}
      {route.name === false && <NotFound />}
    </>
  );
}

export default App;

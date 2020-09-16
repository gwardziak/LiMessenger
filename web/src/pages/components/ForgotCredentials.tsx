import React from "react";
import { Route } from "type-route";
import { routes } from "../../router";

type Props = {
  route: Route<typeof routes.forgotCredentials>;
};

export const ForgotCredentials = (props: Props) => {
  const { route } = props;
  return (
    <>
      <div>
        <p>Forgot Credentials</p>
      </div>
    </>
  );
};

import React from "react";
import { Route } from "type-route";
import { routes } from "../../router";

type Props = {
  route: Route<typeof routes.landing>;
};

export const Main = (props: Props) => {
  const { route } = props;
  return (
    <>
      <div>
        <p>Main</p>
      </div>
    </>
  );
};

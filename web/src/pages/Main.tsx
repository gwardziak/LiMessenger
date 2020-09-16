import React from "react";
import { Route } from "type-route";
import { routes } from "../router";
import { useIsAuth } from "../utils/useIsAuth";

type Props = {
  route: Route<typeof routes.main>;
};

export const Main = (props: Props) => {
  const { route } = props;

  useIsAuth();
  console.log("cwel123");
  return (
    <>
      <div>
        <p>Main</p>
      </div>
    </>
  );
};

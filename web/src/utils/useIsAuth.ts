import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { routes } from "../router";
export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    if (!fetching && !data?.me) {
      routes.landing().replace();
    }
  }, [fetching, data, routes]);
};

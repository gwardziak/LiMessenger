import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { routes, useRoute } from "../router";

export const useIsAuth = () => {
  const [{ fetching, data }] = useMeQuery();
  const route = useRoute();

  console.log("route:", route);

  useEffect(() => {
    console.log(route.name);
    if (!fetching && !data?.me) {
      routes.landing().replace();
    }
  }, [fetching, data, route]);
};

import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const history = useHistory();
  const location = useLocation();

  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    if (!fetching && !data?.me) {
      history.replace("/login?next=" + location.pathname);
    }
  }, [fetching, data, history, location.pathname]);
};

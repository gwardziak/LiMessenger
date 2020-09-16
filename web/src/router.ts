import { createRouter, defineRoute } from "type-route";
import * as ROUTES from "./constants/routes";

export const { RouteProvider, useRoute, routes } = createRouter({
  landing: defineRoute(ROUTES.LANDING),
  main: defineRoute(ROUTES.MAIN),
  register: defineRoute(ROUTES.REGISTER),
  forgotCredentials: defineRoute(ROUTES.FORGOT_CREDENTIALS),
});

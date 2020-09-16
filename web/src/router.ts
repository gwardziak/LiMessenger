import { createRouter, defineRoute } from "type-route";
import * as ROUTES from "./constants/routes";

export const { RouteProvider, useRoute, routes } = createRouter({
  landing: defineRoute(ROUTES.LANDING),
  register: defineRoute(ROUTES.REGISTER),
  forgotCredentials: defineRoute(ROUTES.FORGOT_CREDENTIALS),
});

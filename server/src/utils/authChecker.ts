import { AuthChecker } from "type-graphql";
import { User } from "../db/entities/User";
import { GraphQLServer } from "../GraphQLServer";

export interface Context {
  authUser?: User;
}

export const authChecker: AuthChecker<GraphQLServer.Context> = (
  { context },
  roles
) => {
  if (roles.length === 0) {
    return context.user !== undefined;
  }

  if (!context.user) {
    return false;
  }
  /*ADD ROLES
  if (authUser.roles.some((role) => roles.includes(role))) {
    // grant access if the roles overlap
    return true;
  }
*/

  return false;
};

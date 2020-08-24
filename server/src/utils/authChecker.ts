import { AuthChecker } from "type-graphql";
import { User } from "../db/entities/User";

export interface Context {
  authUser?: User;
}

export const authChecker: AuthChecker<Context> = (
  { context: { authUser } },
  roles
) => {
  if (roles.length === 0) {
    return authUser !== undefined;
  }

  if (!authUser) {
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

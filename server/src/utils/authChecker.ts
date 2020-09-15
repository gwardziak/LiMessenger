import { AuthChecker } from "type-graphql";
import { User } from "../db/entities/User";
import { MyContext } from "../models/MyContext";

export interface Context {
  authUser?: User;
}

export const authChecker: AuthChecker<MyContext> = ({ context }, roles) => {
  if (roles.length === 0) {
    return context.authUser !== undefined;
  }

  if (!context.authUser) {
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

import { User } from "../db/entities/User";

export interface Friendship {
  userA: User;
  userB: User;
}

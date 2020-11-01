import { Field, Int, ObjectType } from "type-graphql";
import { User } from "../../db/entities/User";

namespace FriendshipObjectType {
  export type Options = {
    userA: User;
    userB: User;
  };
}

@ObjectType("Friendship")
export class FriendshipObjectType implements FriendshipObjectType.Options {
  @Field(() => Int)
  userA!: User;

  @Field(() => Int)
  userB!: User;
}

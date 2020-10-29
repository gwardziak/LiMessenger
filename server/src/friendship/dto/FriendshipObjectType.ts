import { Field, Int, ObjectType } from "type-graphql";

namespace FriendshipObjectType {
  export type Options = {
    userA: number;
    userB: number;
  };
}

@ObjectType("Friendship")
export class FriendshipObjectType implements FriendshipObjectType.Options {
  @Field(() => Int)
  userA!: number;

  @Field(() => Int)
  userB!: number;
}

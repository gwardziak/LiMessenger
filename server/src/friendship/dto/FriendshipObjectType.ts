import { Field, ObjectType } from "type-graphql";

namespace FriendshipObjectType {
  export type Options = {
    uuid: string;
    username: string;
  };
}

@ObjectType("Friendship")
export class FriendshipObjectType implements FriendshipObjectType.Options {
  @Field(() => String)
  uuid!: string;

  @Field(() => String)
  username!: string;
}

import { Field, ObjectType } from "type-graphql";

namespace UserObjectType {
  export type Options = {
    uuid: string;
    username: string;
    password: string;
    email: string;
    accountVerified: boolean;
  };
}

@ObjectType("User")
export class UserObjectType implements UserObjectType.Options {
  @Field(() => String)
  uuid!: string;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field(() => Boolean)
  accountVerified!: boolean;
}

/*
  @Field((type) => [Message])
  messages!: Message[];
*/

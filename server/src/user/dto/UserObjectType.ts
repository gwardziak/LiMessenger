import { Field, ObjectType } from "type-graphql";

namespace UserObjectType {
  export type Options = {
    uuid: string;
    username: string;
    password: string;
    email: string;
    accountVerified: boolean;
    // friends: Friends[];
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

  /*
  @Field(() => [Friends])
  friends: Friends[];
*/
}

/*
  @Field((type) => [Message])
  messages!: Message[];
*/

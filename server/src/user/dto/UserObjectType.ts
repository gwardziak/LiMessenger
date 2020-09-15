import { Field, ObjectType } from "type-graphql";
import { Message } from "../../db/entities/Message";

namespace UserObjectType {
  export type Options = {
    uuid: string;
    username: string;
    password: string;
    email: string;
    authToken: string;
    createdAt: Date;
    updatedAt: Date;
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

  @Field()
  authToken!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => Boolean)
  accountVerified!: boolean;

  @Field((type) => [Message])
  messages!: Message[];
}

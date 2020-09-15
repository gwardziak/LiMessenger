import { Field, ObjectType } from "type-graphql";

namespace MessageObjectType {
  export type Options = {
    uuid: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

@ObjectType("Message")
export class MessageObjectType implements MessageObjectType.Options {
  @Field()
  uuid!: string;

  @Field()
  text!: string;

  @Field((type) => Date)
  createdAt!: Date;

  @Field((type) => Date)
  updatedAt!: Date;
}

import { Field, ObjectType } from "type-graphql";
import { Message } from "../../db/entities/Message";

namespace MessageObjectType {
  export type Options = {
    uuid: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  };
  export type UserOptions = {
    uuid: string;
    username: string;
  };
  export type Pagination = {
    messages: Message[];
    hasMore: boolean;
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

@ObjectType("UserMessage")
export class UserMessageObjectType implements MessageObjectType.UserOptions {
  @Field()
  uuid!: string;

  @Field()
  username!: string;
}

@ObjectType("PaginatedMessages")
export class PaginatedMessagesObjectType
  implements MessageObjectType.Pagination {
  @Field(() => [MessageObjectType])
  messages!: Message[];

  @Field()
  hasMore!: boolean;
}

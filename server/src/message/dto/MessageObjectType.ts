import { Field, ID, ObjectType } from "type-graphql";
import { IMessage } from "../../models/Message";

@ObjectType("Message")
export class MessageObjectType implements IMessage {
  @Field((type) => ID)
  id!: number;

  @Field()
  text!: string;

  @Field()
  sender!: string;
}

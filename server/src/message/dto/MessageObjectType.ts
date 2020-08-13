import { Field, ID, ObjectType } from "type-graphql";
import { IMessageObjectType } from "../../models/Message";

@ObjectType("Message")
export class MessageObjectType implements IMessageObjectType {
  @Field((type) => ID)
  id!: number;

  @Field()
  text!: string;

  @Field()
  sender!: string;
}

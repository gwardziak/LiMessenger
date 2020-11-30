import { Field, InputType } from "type-graphql";

export namespace IMessageInput {
  export type MessageOptions = {
    recipientUuid: string;
    text: string;
  };
}

@InputType()
export class MessageInput implements IMessageInput.MessageOptions {
  @Field()
  public readonly recipientUuid!: string;

  @Field()
  public readonly text!: string;
}

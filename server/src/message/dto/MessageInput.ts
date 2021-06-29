import { Stream } from "stream";
import { Field, InputType } from "type-graphql";

export namespace IMessageInput {
  export type MessageOptions = {
    recipientUuid: string;
    text: string;
  };

  export type AttachmentOptions = {
    createReadStream: () => Stream;
    filename: string;
    mimetype: string;
    encoding: string;
  };
}

@InputType()
export class MessageInput implements IMessageInput.MessageOptions {
  @Field()
  public readonly recipientUuid!: string;

  @Field()
  public readonly text!: string;
}

@InputType()
export class AttachmentInput implements IMessageInput.AttachmentOptions {
  @Field(() => Stream)
  createReadStream!: () => Stream;

  @Field()
  filename!: string;

  @Field()
  mimetype!: string;

  @Field()
  encoding!: string;
}

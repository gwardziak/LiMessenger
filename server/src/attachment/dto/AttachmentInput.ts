import { Stream } from "nodemailer/lib/xoauth2";
import { Field, InputType } from "type-graphql";

export namespace IAttachmentInput {
  export type AttachmentOptions = {
    // createReadStream: Stream;
    filename: string;
    mimetype: string;
    encoding: string;
  };
}

@InputType()
export class AttachmentInput implements IAttachmentInput.AttachmentOptions {
  @Field(() => Stream)
  createReadStream!: Stream;

  @Field()
  filename!: string;

  @Field()
  mimetype!: string;

  @Field()
  encoding!: string;
}

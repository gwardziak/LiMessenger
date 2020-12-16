import { Field, ObjectType } from "type-graphql";

namespace AttachmentObjectType {
  export type Options = {
    uuid: string;
    attachment: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

@ObjectType("Attachment")
export class AttachmentObjectType implements AttachmentObjectType.Options {
  @Field()
  uuid!: string;

  @Field()
  attachment!: string;

  @Field((type) => Date)
  createdAt!: Date;

  @Field((type) => Date)
  updatedAt!: Date;
}

import { Field, ObjectType } from "type-graphql";

namespace AttachmentObjectType {
  export type Options = {
    uuid: string;
    name: string;

    createdAt: Date;
    updatedAt: Date;
  };
}

@ObjectType("Attachment")
export class AttachmentObjectType implements AttachmentObjectType.Options {
  @Field()
  uuid!: string;

  @Field()
  name!: string;

  @Field((type) => Date)
  createdAt!: Date;

  @Field((type) => Date)
  updatedAt!: Date;
}

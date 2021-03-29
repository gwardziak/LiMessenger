import { Field, ObjectType } from "type-graphql";
import { Attachment } from "../../db/entities/Attachment";

namespace AttachmentObjectType {
  export type Options = {
    uuid: string;
    name: string;
    mimetype: string;
    createdAt: Date;
    updatedAt: Date;
    height: number;
    width: number;
  };
  export type Pagination = {
    attachments: Attachment[];
    hasMore: boolean;
  };
}

@ObjectType("Attachment")
export class AttachmentObjectType implements AttachmentObjectType.Options {
  @Field()
  uuid!: string;

  @Field()
  name!: string;

  @Field()
  mimetype!: string;

  @Field()
  width!: number;

  @Field()
  height!: number;

  @Field((type) => Date)
  createdAt!: Date;

  @Field((type) => Date)
  updatedAt!: Date;
}

@ObjectType("PaginatedAttachments")
export class PaginatedAttachmentObjectType
  implements AttachmentObjectType.Pagination {
  @Field(() => [AttachmentObjectType])
  attachments!: Attachment[];

  @Field()
  hasMore!: boolean;
}

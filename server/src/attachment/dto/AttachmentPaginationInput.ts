import { Field, InputType, Int } from "type-graphql";

export namespace IAttachmentPaginationInput {
  export type FilesOptions = {
    friendUuid: string;
    limit: number;
    cursor?: string | null;
  };
}

@InputType()
export class AttachmentPaginationInput
  implements IAttachmentPaginationInput.FilesOptions {
  @Field()
  public readonly friendUuid!: string;

  @Field(() => Int)
  public readonly limit!: number;

  @Field(() => String, { nullable: true })
  public readonly cursor!: string | null;

  @Field()
  public readonly isImage!: boolean;
}

import { Field, InputType, Int } from "type-graphql";

export namespace IImagePaginationInput {
  export type ImageOptions = {
    friendUuid: string;
    limit: number;
    cursor?: string | null;
  };
}

@InputType()
export class ImagePaginationInput
  implements IImagePaginationInput.ImageOptions {
  @Field()
  public readonly friendUuid!: string;

  @Field(() => Int)
  public readonly limit!: number;

  @Field(() => String, { nullable: true })
  public readonly cursor!: string | null;
}

import { Field, ObjectType } from "type-graphql";
import { Image } from "../../../db/entities/Image";

namespace ImageObjectType {
  export type Options = {
    uuid: string;
    name: string;
    mimetype: string;
    createdAt: Date;
    updatedAt: Date;
    minHeight: number;
    minWidth: number;
  };

  export type Pagination = {
    images: Image[];
    hasMore: boolean;
  };

  export type Links = {
    orginal: string;
    min: string;
  };
}

@ObjectType("Image")
export class ImageObjectType implements ImageObjectType.Options {
  @Field()
  uuid!: string;

  @Field()
  name!: string;

  @Field()
  mimetype!: string;

  @Field()
  minWidth!: number;

  @Field()
  minHeight!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

@ObjectType("ImagePagination")
export class ImagePaginationObjectType implements ImageObjectType.Pagination {
  @Field(() => [ImageObjectType])
  images!: Image[];

  @Field()
  hasMore!: boolean;
}

@ObjectType("Links")
export class LinksObjectType implements ImageObjectType.Links {
  @Field()
  orginal!: string;

  @Field({ nullable: true })
  min!: string;
}

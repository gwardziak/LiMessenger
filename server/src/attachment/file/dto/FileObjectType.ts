import { Field, ObjectType } from "type-graphql";
import { File } from "../../../db/entities/File";

namespace FileObjectType {
  export type Options = {
    uuid: string;
    name: string;
    mimetype: string;
    createdAt: Date;
    updatedAt: Date;
  };
  export type Pagination = {
    files: File[];
    hasMore: boolean;
  };
}

@ObjectType("File")
export class FileObjectType implements FileObjectType.Options {
  @Field()
  uuid!: string;

  @Field()
  name!: string;

  @Field()
  mimetype!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

@ObjectType("FilePagination")
export class FilePaginationObjectType implements FileObjectType.Pagination {
  @Field(() => [FileObjectType])
  files!: File[];

  @Field()
  hasMore!: boolean;
}

import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { File } from "../../db/entities/File";
import { GraphQLServer } from "../../GraphQLServer";
import { FileObjectType, FilePaginationObjectType } from "./dto/FileObjectType";
import { FilePaginationInput } from "./dto/FilePaginationInput";
import { FileService } from "./FileService";

@Resolver(FileObjectType)
export class FileResolver {
  private constructor(private readonly fileService: FileService) {}

  @Query(() => FilePaginationObjectType)
  async files(
    @Arg("options")
    options: FilePaginationInput,
    @Ctx() { user }: GraphQLServer.Context
  ): Promise<{
    files: File[];
    hasMore: boolean;
  }> {
    return await this.fileService.get(user!, options);
  }

  @FieldResolver(() => String)
  async link(
    @Root() file: File,
    @Ctx() { loaders }: GraphQLServer.Context
  ): Promise<string> {
    return loaders.fileLink.load(file.id);
  }
}

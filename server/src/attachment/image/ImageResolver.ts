import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Image } from "../../db/entities/Image";
import { GraphQLServer } from "../../GraphQLServer";
import {
  ImageObjectType,
  ImagePaginationObjectType,
  LinksObjectType,
} from "./dto/ImageObjectType";
import { ImagePaginationInput } from "./dto/ImagePaginationInput";
import { ImageService } from "./ImageService";

@Resolver(ImageObjectType)
export class ImageResolver {
  private constructor(private readonly imageService: ImageService) {}

  @Query(() => ImagePaginationObjectType)
  async images(
    @Arg("options")
    options: ImagePaginationInput,
    @Ctx() { user }: GraphQLServer.Context
  ): Promise<{
    images: Image[];
    hasMore: boolean;
  }> {
    return await this.imageService.get(user!, options);
  }

  @FieldResolver(() => LinksObjectType)
  async links(
    @Root() image: Image,
    @Ctx() { loaders }: GraphQLServer.Context
  ): Promise<{ orginal: string; min: string | null }> {
    return loaders.imageLinks.load(image.id);
  }
}

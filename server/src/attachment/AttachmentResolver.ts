import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Attachment } from "../db/entities/Attachment";
import { GraphQLServer } from "../GraphQLServer";
import { AttachmentService } from "./AttachmentService";
import {
  AttachmentObjectType,
  PaginatedAttachmentObjectType,
} from "./dto/AttachmentObjectType";
import { AttachmentPaginationInput } from "./dto/AttachmentPaginationInput";

@Resolver(AttachmentObjectType)
export class AttachmentResolver {
  private constructor(private readonly attachmentService: AttachmentService) {}

  @Query(() => PaginatedAttachmentObjectType)
  async attachments(
    @Arg("options")
    options: AttachmentPaginationInput,
    @Ctx() { user }: GraphQLServer.Context
  ): Promise<{
    attachments: Attachment[];
    hasMore: boolean;
  }> {
    return await this.attachmentService.getAll(user!, options);
  }

  @FieldResolver(() => String)
  async link(
    @Root() attachment: Attachment,
    @Ctx() { loaders }: GraphQLServer.Context
  ): Promise<string> {
    return loaders.link.load(attachment.id);
  }
}

import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Attachment } from "../db/entities/Attachment";
import { MyContext } from "../models/MyContext";
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
    @Ctx() { user }: MyContext
  ): Promise<{
    attachments: Attachment[];
    hasMore: boolean;
  }> {
    return await this.attachmentService.getAll(user, options);
  }

  @FieldResolver(() => String)
  async link(@Root() attachment: Attachment): Promise<string> {
    return await this.attachmentService.link(attachment.id);
  }
}

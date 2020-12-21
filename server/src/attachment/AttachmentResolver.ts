import { FieldResolver, Resolver, Root } from "type-graphql";
import { Attachment } from "../db/entities/Attachment";
import { AttachmentService } from "./AttachmentService";
import { AttachmentObjectType } from "./dto/AttachmentObjectType";

@Resolver(AttachmentObjectType)
export class AttachmentResolver {
  private constructor(private readonly attachmentService: AttachmentService) {}

  @FieldResolver(() => String)
  async link(@Root() attachment: Attachment): Promise<string> {
    return await this.attachmentService.link(attachment.id);
  }
}

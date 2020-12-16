import { GraphQLUpload } from "graphql-upload";
import { Arg, Mutation, Resolver } from "type-graphql";
import { AttachmentService } from "./AttachmentService";
import { AttachmentInput } from "./dto/AttachmentInput";

@Resolver()
export class AttachmentResolver {
  private constructor(private readonly attachmentService: AttachmentService) {}

  @Mutation(() => Boolean)
  async uploadAttachment(
    @Arg("attachments", () => GraphQLUpload)
    files: [AttachmentInput]
  ): Promise<boolean> {
    await this.attachmentService.upload(files);
    return true;
  }
}

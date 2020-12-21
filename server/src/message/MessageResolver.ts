import { GraphQLUpload } from "graphql-upload";
import { Resolver } from "type-graphql";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Root,
} from "type-graphql/decorators";
import { AttachmentInput } from "../attachment/dto/AttachmentInput";
import { AttachmentObjectType } from "../attachment/dto/AttachmentObjectType";
import { Message } from "../db/entities/Message";
import { MyContext } from "../models/MyContext";
import { MessageInput } from "./dto/MessageInput";
import {
  MessageObjectType,
  PaginatedMessagesObjectType,
  UserMessageObjectType,
} from "./dto/MessageObjectType";
import { MessagesInput } from "./dto/MessagesInput";
import { MessageService } from "./MessageService";

@Resolver(MessageObjectType)
export class MessageResolver {
  private constructor(private readonly messageService: MessageService) {}

  @Query(() => PaginatedMessagesObjectType)
  async messages(
    @Arg("options")
    options: MessagesInput,
    @Ctx() { authUser }: MyContext
  ): Promise<{
    messages: Message[];
    hasMore: boolean;
  }> {
    return await this.messageService.getAll(authUser, options);
  }

  @Query(() => [MessageObjectType])
  async firstMessages(@Ctx() { authUser }: MyContext): Promise<Message[]> {
    return await this.messageService.firstMessages(authUser);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async sendMessage(
    @Arg("options")
    options: MessageInput,
    @Arg("file", () => GraphQLUpload, { nullable: true })
    file: AttachmentInput,
    @Ctx() { authUser }: MyContext
  ): Promise<boolean> {
    await this.messageService.sendMessage(authUser, options, file);
    return true;
  }

  @FieldResolver(() => UserMessageObjectType)
  async sender(@Root() message: Message): Promise<UserMessageObjectType> {
    return await this.messageService.sender(message.id);
  }

  @FieldResolver(() => UserMessageObjectType)
  async recipient(@Root() message: Message): Promise<UserMessageObjectType> {
    return await this.messageService.recipient(message.id);
  }

  @FieldResolver(() => [AttachmentObjectType])
  async attachments(@Root() message: Message): Promise<AttachmentObjectType[]> {
    return await this.messageService.attachments(message.id);
  }
}

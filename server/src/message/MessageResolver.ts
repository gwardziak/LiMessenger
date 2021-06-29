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
import { FileObjectType } from "../attachment/file/dto/FileObjectType";
import { ImageObjectType } from "../attachment/image/dto/ImageObjectType";
import { Message } from "../db/entities/Message";
import { GraphQLServer } from "../GraphQLServer";
import { AttachmentInput, MessageInput } from "./dto/MessageInput";
import {
  MessageObjectType,
  PaginatedMessagesObjectType,
  UserMessageObjectType,
} from "./dto/MessageObjectType";
import { MessagePaginationInput } from "./dto/MessagePaginationInput";
import { MessageService } from "./MessageService";

@Resolver(MessageObjectType)
export class MessageResolver {
  private constructor(private readonly messageService: MessageService) {}

  @Query(() => PaginatedMessagesObjectType)
  async messages(
    @Arg("options")
    options: MessagePaginationInput,
    @Ctx() { user }: GraphQLServer.Context
  ): Promise<{
    messages: Message[];
    hasMore: boolean;
  }> {
    return await this.messageService.getAll(user!, options);
  }

  @Query(() => [MessageObjectType])
  async firstMessages(
    @Ctx() { user }: GraphQLServer.Context
  ): Promise<Message[]> {
    return await this.messageService.firstMessages(user!);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async sendMessage(
    @Arg("options")
    options: MessageInput,
    @Arg("files", () => [GraphQLUpload], { nullable: true })
    files: AttachmentInput[],
    @Ctx() { user }: GraphQLServer.Context
  ): Promise<boolean> {
    await this.messageService.sendMessage(user!, options, files);
    return true;
  }

  @FieldResolver(() => UserMessageObjectType)
  async sender(
    @Root() message: Message,
    @Ctx() { loaders }: GraphQLServer.Context
  ): Promise<UserMessageObjectType> {
    return loaders.sender.load(message.id);
  }

  @FieldResolver(() => UserMessageObjectType)
  async recipient(
    @Root() message: Message,
    @Ctx() { loaders }: GraphQLServer.Context
  ): Promise<UserMessageObjectType> {
    return loaders.recipient.load(message.id);
  }

  @FieldResolver(() => [ImageObjectType])
  async images(
    @Root() message: Message,
    @Ctx() { loaders }: GraphQLServer.Context
  ): Promise<ImageObjectType[]> {
    return loaders.images.load(message.id);
  }

  @FieldResolver(() => [FileObjectType])
  async files(
    @Root() message: Message,
    @Ctx() { loaders }: GraphQLServer.Context
  ): Promise<FileObjectType[]> {
    return loaders.files.load(message.id);
  }
}

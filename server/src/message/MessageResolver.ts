import { Query, Resolver } from "type-graphql";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Root,
} from "type-graphql/decorators";
import { Message } from "../db/entities/Message";
import { MyContext } from "../models/MyContext";
import { MessageInput } from "./dto/MessageInput";
import {
  MessageObjectType,
  PaginatedMessagesObjectType,
  UserMessageObjectType,
} from "./dto/MessageObjectType";
import { MessagesArgs } from "./dto/MessagesArgs";
import { MessageService } from "./MessageService";

@Resolver(MessageObjectType)
export class MessageResolver {
  private constructor(private readonly messageService: MessageService) {}

  @Query(() => PaginatedMessagesObjectType)
  async messages(
    @Arg("options")
    options: MessagesArgs,
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
    @Ctx() { authUser }: MyContext
  ): Promise<boolean> {
    await this.messageService.sendMessage(authUser, options);
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
}

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
  UserMessageObjectType,
} from "./dto/MessageObjectType";
import { MessageService } from "./MessageService";

@Resolver(MessageObjectType)
export class MessageResolver {
  private constructor(private readonly messageService: MessageService) {}

  @Query(() => [MessageObjectType])
  async messages(
    @Arg("friendUuid") friendUuid: string,
    @Ctx() { authUser }: MyContext
  ): Promise<Message[]> {
    return await this.messageService.getAll(authUser, friendUuid);
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

  // @Authorized()
  // @Mutation(() => Boolean)
  // async sendMessage(
  //   @Arg("message") message: string,
  //   @Arg("recipentUuid") uuid: string,
  //   @Ctx() { authUser }: MyContext
  // ): Promise<boolean> {
  //   await this.messageService.sendMessage(authUser, message, uuid);
  //   return true;
  // }

  @FieldResolver(() => UserMessageObjectType)
  async sender(@Root() message: Message): Promise<UserMessageObjectType> {
    const user = await this.messageService.sender(message.id);
    return user;
  }

  @FieldResolver(() => UserMessageObjectType)
  async recipient(@Root() message: Message): Promise<UserMessageObjectType> {
    const user = await this.messageService.recipient(message.id);
    return user;
  }
}

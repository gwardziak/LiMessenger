import { Arg, Query, Resolver } from "type-graphql";
import {
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Root,
} from "type-graphql/decorators";
import { Message } from "../db/entities/Message";
import { MyContext } from "../models/MyContext";
import {
  MessageObjectType,
  UserMessageObjectType,
} from "./dto/MessageObjectType";
import { MessageService } from "./MessageService";

@Resolver(MessageObjectType)
export class MessageResolver {
  private constructor(private readonly messageService: MessageService) {}

  @Query(() => MessageObjectType, { nullable: true })
  async message(
    @Arg("uuid", () => String) uuid: string
  ): Promise<Message | undefined> {
    return await this.messageService.getOne(uuid);
  }

  @Query(() => [MessageObjectType])
  async messages(): Promise<Message[]> {
    return await this.messageService.getAll();
  }

  @Authorized()
  @Mutation(() => Boolean)
  async sendMessage(
    @Arg("message") message: string,
    @Arg("topic") topic: string,
    @Arg("recipentUuid") uuid: string,
    @Ctx() { authUser }: MyContext
  ): Promise<boolean> {
    await this.messageService.sendMessage(authUser, message, uuid);
    return true;
  }

  @FieldResolver(() => UserMessageObjectType)
  async sender(@Root() message: Message): Promise<UserMessageObjectType> {
    const user = await this.messageService.user(message.id);
    return { uuid: user.uuid, username: user.username };
  }
}

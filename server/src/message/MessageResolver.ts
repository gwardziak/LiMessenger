import { Arg, Query, Resolver } from "type-graphql";
import {
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Root,
  Subscription,
} from "type-graphql/decorators";
import { Message } from "../db/entities/Message";
import { MyContext } from "../models/MyContext";
import { MessageObjectType } from "./dto/MessageObjectType";
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
    @Ctx() context: MyContext
  ): Promise<boolean> {
    await this.messageService.sendMessage(context.authUser, message, "1");
    return true;
  }

  @FieldResolver(() => String)
  async username(@Root() message: Message): Promise<string> {
    const user = await this.messageService.getMessageOwner(message.id);
    return user.username;
  }

  @Subscription({ topics: "MESSAGES" })
  chatSubscription(@Root() message: Message): MessageObjectType {
    return message;
  }
}

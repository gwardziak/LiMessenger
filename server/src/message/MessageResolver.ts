import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Message } from "../db/entities/Message";
import { User } from "../db/entities/User";
import { IChatSubArgs } from "./dto/ChatSubArgs";
import { MessageObjectType } from "./dto/MessageObjectType";
import { MessageService } from "./MessageService";

@Resolver(MessageObjectType)
export class MessageResolver {
  private constructor(private readonly messageService: MessageService) {}

  @Query(() => MessageObjectType, { nullable: true })
  async message(@Arg("messageId") id: number): Promise<Message | undefined> {
    return await this.messageService.getOne(id);
  }

  @Query(() => [MessageObjectType])
  async messages(): Promise<Message[]> {
    return await this.messageService.getAll();
  }

  @FieldResolver()
  async username(@Root() message: Message): Promise<string> {
    const user = await this.messageService.getMessageOwner(message.id);

    return user!.username;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async sendMessage(
    @Arg("message") message: string,
    @Ctx() context: { authUser: User }
  ): Promise<boolean> {
    await this.messageService.sendMessage(context.authUser, message);
    return true;
  }

  @Subscription({ topics: "MESSAGES" })
  chatSubscription(@Root() message: IChatSubArgs): MessageObjectType {
    return message;
  }
}

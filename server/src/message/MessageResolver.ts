import {
  Arg,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Message } from "../db/entities/Message";
import { IMessage } from "../models/Message";
import { MessageObjectType } from "./dto/MessageObjectType";
import { MessageService } from "./MessageService";

@Resolver()
export class MessageResolver {
  private constructor(private readonly messageService: MessageService) {}

  @Query(() => [MessageObjectType])
  async products(): Promise<Message[]> {
    return await this.messageService.getAll();
  }

  @Mutation(() => Boolean)
  async publishMessage(
    @PubSub("MESSAGES") publish: Publisher<IMessage>,
    @Arg("message") message: string
  ): Promise<boolean> {
    return await this.messageService.pushMessage(publish, message);
  }

  @Subscription({ topics: "MESSAGES" })
  chatSubscription(@Root() { id, text, sender }: IMessage): MessageObjectType {
    return { id, text, sender };
  }
}

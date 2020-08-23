import { ForbiddenError } from "apollo-server-express";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Message } from "../db/entities/Message";
import { User } from "../db/entities/User";
import { IMessage } from "../models/Message";
import { MessageObjectType } from "./dto/MessageObjectType";
import { MessageService } from "./MessageService";

@Resolver()
export class MessageResolver {
  private constructor(private readonly messageService: MessageService) {}

  @Query(() => [MessageObjectType])
  async messages(): Promise<Message[]> {
    return await this.messageService.getAll();
  }

  @Mutation(() => Boolean)
  async sendMessage(
    @Arg("message") message: string,
    @Ctx() context: { authUser: User }
  ): Promise<boolean> {
    if (!context.authUser) {
      throw new ForbiddenError("Not authenticated as user.");
    }

    await this.messageService.sendMessage(message);
    return true;
  }

  @Subscription({ topics: "MESSAGES" })
  chatSubscription(@Root() message: IMessage): MessageObjectType {
    return message;
  }
}

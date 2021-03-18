import { Resolver, ResolverFilterData, Root, Subscription } from "type-graphql";
import { Message } from "../db/entities/Message";
import { MessageObjectType } from "../message/dto/MessageObjectType";
import { MyContext } from "../models/MyContext";
import { ChatroomService } from "./ChatroomService";

@Resolver()
export class ChatroomResolver {
  private constructor(private readonly chatroomService: ChatroomService) {}

  @Subscription({
    topics: ["NEW_MESSAGE", "WRITING"],
    filter: ({
      payload,
      context,
    }: ResolverFilterData<Message, any, MyContext>) => {
      return (
        payload.recipient.uuid === context.user?.uuid ||
        payload.sender.id === context.user?.id
      );
    },
  })
  chatroomSubscription(@Root() message: Message): MessageObjectType {
    return message;
  }
}

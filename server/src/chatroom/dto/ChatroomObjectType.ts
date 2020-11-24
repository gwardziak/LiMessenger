import { ObjectType } from "type-graphql";

namespace ChatroomObjectType {
  export type Options = {};
}

@ObjectType("Chatroom")
export class ChatroomObjectType implements ChatroomObjectType.Options {}

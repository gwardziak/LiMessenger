import { Field, ID, ObjectType } from "type-graphql";
import { Message } from "../../db/entities/Message";
import { IUser } from "../../models/User";

type IUserObjectType = Omit<IUser, "password" | "authToken">;

@ObjectType("User")
export class UserObjectType implements IUserObjectType {
  @Field((type) => ID)
  id!: number;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field((type) => [Message])
  messages!: Message[];
}

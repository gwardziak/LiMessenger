import { Field, ID, ObjectType } from "type-graphql";
import { Message } from "../../db/entities/Message";
import { IUser } from "../../models/User";

type IUserObjectType = Omit<IUser, "password">;

@ObjectType("User")
export class UserObjectType implements IUserObjectType {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field((type) => [Message])
  messages!: Message[];
}

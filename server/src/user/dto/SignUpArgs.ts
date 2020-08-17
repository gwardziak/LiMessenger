import { ArgsType, Field } from "type-graphql";
import { IUser } from "../../models/User";

type ISignUpArgs = Omit<IUser, "id">;

@ArgsType()
export class SignUpArgs implements ISignUpArgs {
  @Field()
  public readonly name!: string;

  @Field()
  public readonly password!: string;

  @Field()
  public readonly email!: string;
}

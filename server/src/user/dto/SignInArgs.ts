import { ArgsType, Field } from "type-graphql";

export interface ISignInArgs {
  login: string;
  password: string;
}

@ArgsType()
export class SignInArgs implements ISignInArgs {
  @Field()
  public readonly login!: string;

  @Field()
  public readonly password!: string;
}

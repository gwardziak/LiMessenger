import { Field, InputType } from "type-graphql";

export namespace ISignInInput {
  export type UserOptions = {
    login: string;
    password: string;
  };
}

@InputType()
export class SignInInput implements ISignInInput.UserOptions {
  @Field()
  public readonly login!: string;

  @Field()
  public readonly password!: string;
}

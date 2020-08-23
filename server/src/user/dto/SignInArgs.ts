import { Response } from "express";
import { ArgsType, Field } from "type-graphql";

export namespace ISignInArgs {
  export type UserOptions = {
    login: string;
    password: string;
  };
  export interface Context {
    res: Response;
  }
}

@ArgsType()
export class SignInArgs implements ISignInArgs.UserOptions {
  @Field()
  public readonly login!: string;

  @Field()
  public readonly password!: string;
}

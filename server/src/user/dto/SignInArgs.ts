import { Request, Response } from "express";
import { ArgsType, Field } from "type-graphql";
import { User } from "../../db/entities/User";

export namespace ISignInArgs {
  export type UserOptions = {
    login: string;
    password: string;
  };
  export interface Context {
    req: Request;
    res: Response;
    authUser: User;
  }
}

@ArgsType()
export class SignInArgs implements ISignInArgs.UserOptions {
  @Field()
  public readonly login!: string;

  @Field()
  public readonly password!: string;
}

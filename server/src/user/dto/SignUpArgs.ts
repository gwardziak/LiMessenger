import { IsEmail, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

export interface ISignUpArgs {
  username: string;
  password: string;
  email: string;
}

@ArgsType()
export class SignUpArgs implements ISignUpArgs {
  @Field()
  public readonly username!: string;

  @Field()
  @MinLength(8)
  public readonly password!: string;

  @Field()
  @IsEmail()
  public readonly email!: string;
}

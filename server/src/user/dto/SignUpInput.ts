import { IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

export interface ISignUpInput {
  username: string;
  password: string;
  email: string;
}

@InputType()
export class SignUpInput implements ISignUpInput {
  @Field()
  public readonly username!: string;

  @Field()
  @MinLength(8)
  public readonly password!: string;

  @Field()
  @IsEmail()
  public readonly email!: string;
}

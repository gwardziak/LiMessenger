import { IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

export interface ISignUpInput {
  username: string;
  password: string;
  email: string;
}

@InputType()
export class SignUpInput implements ISignUpInput {
  @MinLength(1, { message: () => "Login should be atleast one char long" })
  @Field()
  public readonly username!: string;

  @Field()
  @MinLength(8, { message: "Password should be atleast 8 characters long" })
  public readonly password!: string;

  @Field()
  @IsEmail(undefined, { message: "Invalid email" })
  public readonly email!: string;
}

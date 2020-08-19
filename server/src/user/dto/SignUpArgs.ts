import { IsEmail, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";
import { ISignUpArgs } from "../../models/User";

@ArgsType()
export class SignUpArgs implements ISignUpArgs {
  @Field()
  public readonly name!: string;

  @Field()
  @MinLength(8)
  public readonly password!: string;

  @Field()
  @IsEmail()
  public readonly email!: string;
}

import { Field, InputType } from "type-graphql";

export interface IAuthorizeInput {
  token: string | null;
}

@InputType()
export class AuthorizeInput implements IAuthorizeInput {
  @Field({ nullable: true })
  public readonly token!: string;
}

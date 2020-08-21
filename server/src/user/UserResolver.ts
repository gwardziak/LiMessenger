import { Args, Mutation, Resolver } from "type-graphql";
import { IUser } from "../models/User";
import { SignInArgs } from "./dto/SignInArgs";
import { SignUpArgs } from "./dto/SignUpArgs";
import { UserService } from "./UserService";

type Token = IUser["authToken"];

@Resolver()
export class UserResolver {
  private constructor(private readonly userService: UserService) {}

  @Mutation(() => String)
  async signUp(@Args() credentials: SignUpArgs): Promise<Token> {
    const user = await this.userService.createUser(credentials);
    return user.authToken;
  }

  @Mutation(() => String)
  async signIn(@Args() credentials: SignInArgs): Promise<Token> {
    const user = await this.userService.login(credentials);
    return user.authToken;
  }
}

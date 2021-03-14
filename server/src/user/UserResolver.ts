import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../db/entities/User";
import { UserMessageObjectType } from "../message/dto/MessageObjectType";
import { MyContext } from "./../models/MyContext";
import { AuthorizeInput } from "./dto/AuthorizeInput";
import { SignInInput } from "./dto/SignInInput";
import { SignUpInput } from "./dto/SignUpInput";
import { UserObjectType } from "./dto/UserObjectType";
import { UserService } from "./UserService";

@Resolver()
export class UserResolver {
  private constructor(private readonly userService: UserService) {}

  @Authorized()
  @Query(() => UserObjectType, { nullable: true })
  async me(@Ctx() { user }: MyContext): Promise<User | null> {
    return await this.userService.me(user);
  }

  @Query(() => [UserMessageObjectType])
  async findUser(@Arg("phase") phase: string): Promise<User[]> {
    return await this.userService.findUsers(phase);
  }

  @Query(() => UserObjectType, { nullable: true })
  async authorize(
    @Arg("token") token: AuthorizeInput,
    @Ctx() context: MyContext
  ): Promise<User | null> {
    return await this.userService.authorize(token, context);
  }

  @Mutation(() => Boolean)
  async signUp(@Arg("options") options: SignUpInput): Promise<boolean> {
    await this.userService.createUser(options);
    return true;
  }

  @Mutation(() => String)
  async signIn(
    @Arg("options")
    options: SignInInput
  ): Promise<string> {
    return await this.userService.login(options);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async signOut(): Promise<boolean> {
    return true;
  }
}

import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../db/entities/User";
import { MyContext } from "./../models/MyContext";
import { SignInInput } from "./dto/SignInInput";
import { SignUpInput } from "./dto/SignUpInput";
import { UserObjectType } from "./dto/UserObjectType";
import { UserService } from "./UserService";

@Resolver()
export class UserResolver {
  private constructor(private readonly userService: UserService) {}

  @Query(() => UserObjectType, { nullable: true })
  me(@Ctx() context: MyContext): User | null {
    return this.userService.authorize(context.authUser);
  }

  @Mutation(() => Boolean)
  async signUp(@Arg("options") options: SignUpInput): Promise<boolean> {
    await this.userService.createUser(options);
    return true;
  }

  @Mutation(() => Boolean)
  async signIn(
    @Arg("options")
    options: SignInInput,
    @Ctx() context: MyContext
  ): Promise<boolean> {
    const token = await this.userService.login(options);

    context.res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return true;
  }
}

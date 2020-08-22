import { Args, Ctx, Mutation, Resolver } from "type-graphql";
import { IUser } from "../models/User";
import { SignInArgs } from "./dto/SignInArgs";
import { SignUpArgs } from "./dto/SignUpArgs";
import { UserService } from "./UserService";

type Token = IUser["authToken"];

@Resolver()
export class UserResolver {
  private constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async signUp(@Args() credentials: SignUpArgs): Promise<boolean> {
    await this.userService.createUser(credentials);
    return true;
  }

  @Mutation(() => Boolean)
  async signIn(@Args() credentials: SignInArgs, @Ctx() ctx: any) {
    const token = await this.userService.login(credentials);

    ctx.res.cookie("id", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    console.log(token);
    console.log("Cookie has been created");

    return true;
  }
}

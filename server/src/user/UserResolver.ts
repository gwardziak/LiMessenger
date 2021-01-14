import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../db/entities/User";
import { UserMessageObjectType } from "../message/dto/MessageObjectType";
import { MyContext } from "./../models/MyContext";
import { SignInInput } from "./dto/SignInInput";
import { SignUpInput } from "./dto/SignUpInput";
import { UserObjectType } from "./dto/UserObjectType";
import { UserService } from "./UserService";

@Resolver()
export class UserResolver {
  private constructor(private readonly userService: UserService) {}

  // // @Authorized()
  // @Query(() => UserObjectType, { nullable: true })
  // async me(@Ctx() context: MyContext): Promise<User | null> {
  //   const res = await this.userService.authorize(context.authUser);
  //   console.log(res)
  //   return res
  // }

  // // @Authorized()
  @Query(() => UserObjectType, { nullable: true })
  me(@Ctx() context: MyContext): User | null {
    return this.userService.authorize(context.authUser);
  }

  @Query(() => [UserMessageObjectType])
  async findUser(@Arg("phase") phase: string): Promise<User[]> {
    return await this.userService.findUsers(phase);
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

  @Authorized()
  @Mutation(() => Boolean)
  async signOut(@Ctx() context: MyContext): Promise<boolean> {
    context.res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
    });

    return true;
  }
}

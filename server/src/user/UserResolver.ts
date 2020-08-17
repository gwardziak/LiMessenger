import { Args, Mutation, Resolver } from "type-graphql";
import { SignUpArgs } from "./dto/SignUpArgs";
import { UserService } from "./UserService";

@Resolver()
export class UserResolver {
  private constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async signUp(@Args() data: SignUpArgs): Promise<boolean> {
    await this.userService.signUp(data);
    return true;
  }
}

import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Friendship } from "../db/entities/Friendship";
import { MyContext } from "../models/MyContext";
import { FriendshipObjectType } from "./dto/FriendshipObjectType";
import { FriendshipService } from "./FriendshipService";

@Resolver()
export class FriendshipResolver {
  private constructor(private readonly friendshipService: FriendshipService) {}

  @Query(() => [FriendshipObjectType])
  async friendships(@Arg("id", () => Int) id: number): Promise<Friendship[]> {
    return await this.friendshipService.getAll(id);
  }

  @Mutation(() => Boolean)
  async addFriend(
    @Arg("id") id: number,
    @Ctx() { authUser }: MyContext
  ): Promise<boolean> {
    //await this.friendshipService.addFriend(1, id);
    await this.friendshipService.addFriend(authUser, id);
    return true;
  }
}

import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { MyContext } from "../models/MyContext";
import { FriendshipObjectType } from "./dto/FriendshipObjectType";
import { FriendshipService } from "./FriendshipService";

@Resolver()
export class FriendshipResolver {
  private constructor(private readonly friendshipService: FriendshipService) {}

  @Query(() => [FriendshipObjectType])
  async friendships(
    @Arg("id", () => Int) id: number
  ): Promise<FriendshipObjectType[]> {
    const result = await this.friendshipService.getAll(id);

    if (result.length === 0) return [];
    else {
      const filterFriends = [];

      for (const friend of result) {
        friend.userA.id != id
          ? filterFriends.push({
              uuid: friend.userA.uuid,
              username: friend.userA.username,
            })
          : filterFriends.push({
              uuid: friend.userB.uuid,
              username: friend.userB.username,
            });
      }

      return filterFriends;
    }
  }

  @Mutation(() => Boolean)
  async addFriend(
    @Arg("id") id: number,
    @Ctx() { authUser }: MyContext
  ): Promise<boolean> {
    await this.friendshipService.addFriend(authUser, id);
    return true;
  }

  @Subscription({ topics: "FRIENDSHIPS" })
  friendshipSubscription(@Root() message: any): FriendshipObjectType {
    console.log(message);
    return message;
  }
}

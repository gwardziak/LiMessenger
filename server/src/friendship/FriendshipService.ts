import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Friendship } from "../db/entities/Friendship";
import { User } from "../db/entities/User";

@Service()
export class FriendshipService {
  private friendshipRepository = getRepository(Friendship);
  private userRepository = getRepository(User);

  async getAll(id: number): Promise<Friendship[]> {
    const result = await this.friendshipRepository
      .createQueryBuilder("friendship")
      .leftJoinAndSelect("friendship.userA", "userA")
      .leftJoinAndSelect("friendship.userB", "userB")
      .where("userA.id = :userId OR userB.id = :userId", { userId: id })
      .getMany();

    return result;
  }

  async addFriend(user: User, friendId: number): Promise<void> {
    const friend = await this.userRepository.findOne(friendId);

    if (!friend) {
      throw new Error("friend not found");
    }

    const friendship = new Friendship({
      userA: user,
      userB: friend,
    });

    await this.friendshipRepository.insert(friendship);
  }
}

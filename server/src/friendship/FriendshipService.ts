import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Friendship } from "../db/entities/Friendship";
import { User } from "../db/entities/User";

@Service()
export class FriendshipService {
  private friendshipRepository = getRepository(Friendship);
  private userRepository = getRepository(User);

  async getOne(id: number): Promise<Friendship | undefined> {
    return await this.friendshipRepository.findOne(id);
  }

  async getAll(id: number): Promise<Friendship[]> {
    const a: any = await this.friendshipRepository.find({
      relations: ["users"],
      where: { userA: 2 },
    });
    console.log(a);
    return await this.friendshipRepository.find({ where: { userA: id } });
  }

  async addFriend(user: User, friendId: number): Promise<void> {
    const friend = await this.userRepository.findOne(friendId);

    if (!friend) {
      throw Error("user not found");
    }

    const friendship = new Friendship({
      userA: user.id > friendId ? friend : user,
      userB: user.id > friendId ? user.id : friendId,
      users: [user, friend],
    });

    await this.friendshipRepository.save(friendship);
  }
}

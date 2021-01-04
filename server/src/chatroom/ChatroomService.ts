import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Chatroom } from "../db/entities/Chatroom";
import { User } from "../db/entities/User";

@Service()
export class ChatroomService {
  private chatroomRepository = getRepository(Chatroom);

  async createChatroom(userA: User, userB: User): Promise<Chatroom> {
    if (userA.id === userB.id)
      throw new Error("Unexpected error occured druing creating a chat");

    const room = new Chatroom({
      participantA: userA,
      participantB: userB,
    });

    const {
      identifiers: [participantA, participantB],
    } = await this.chatroomRepository.insert(room);

    const chatroom = await this.chatroomRepository
      .createQueryBuilder("chatroom")
      .leftJoinAndSelect("chatroom.participantA", "participantA")
      .leftJoinAndSelect("chatroom.participantB", "participantB")
      .where(
        `participantA.id = :participantAId AND participantB.id = :participantBId`,
        {
          participantAId: participantA.id,
          participantBId: participantB.id,
        }
      )
      .getOne();

    return chatroom!;
  }
}

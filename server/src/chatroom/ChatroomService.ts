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

    await this.chatroomRepository.insert(room);

    return room;
  }
}

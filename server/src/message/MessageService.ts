import { PubSubEngine } from "type-graphql";
import { Inject, Service } from "typedi";
import { getRepository } from "typeorm";
import { Message } from "../db/entities/Message";
import { User } from "../db/entities/User";
import { ChatroomService } from "./../chatroom/ChatroomService";
import { Chatroom } from "./../db/entities/Chatroom";

@Service()
export class MessageService {
  private constructor(
    @Inject("PUB_SUB") private readonly pubSub: PubSubEngine,
    private readonly chatroomService: ChatroomService
  ) {}
  private messageRepository = getRepository(Message);
  private userRepository = getRepository(User);
  private chatroomRepository = getRepository(Chatroom);

  async getOne(uuid: string): Promise<Message | undefined> {
    return await this.messageRepository.findOne({ where: { uuid } });
  }

  async getAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async sendMessage(
    sender: User,
    text: string,
    recipientUuid: string
  ): Promise<void> {
    let room = await this.chatroomRepository
      .createQueryBuilder("chatroom")
      .leftJoinAndSelect("chatroom.userA", "userA")
      .leftJoinAndSelect("chatroom.userB", "userB")
      .where(
        "userA.id = :userId AND userB.uuid = :uuid OR userA.uuid = :uuid AND userB.id = :userId",
        { userId: sender.id, uuid: recipientUuid }
      )
      .getOne();

    if (!room) {
      const user = await this.userRepository.findOne({
        where: { uuid: recipientUuid },
      });
      if (!user) throw new Error("Selected chat doesnt exist");

      room = await this.chatroomService.createChatroom(user, sender);
    }

    const message = new Message({
      text,
      sender,
      room,
    });

    await this.messageRepository.insert(message);
    await this.pubSub.publish(room.userA.uuid + room.userB.uuid, message);
  }

  async user(id: number): Promise<User> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ["sender"],
    });
    return message!.sender;
  }
}

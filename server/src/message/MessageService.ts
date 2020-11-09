import { PubSubEngine } from "type-graphql";
import { Inject, Service } from "typedi";
import { getRepository } from "typeorm";
import { Message } from "../db/entities/Message";
import { User } from "../db/entities/User";
import { Chatroom } from "./../db/entities/Chatroom";

@Service()
export class MessageService {
  private constructor(
    @Inject("PUB_SUB") private readonly pubSub: PubSubEngine
  ) {}

  private messageRepository = getRepository(Message);
  private chatroomRepository = getRepository(Chatroom);

  async getOne(uuid: string): Promise<Message | undefined> {
    return await this.messageRepository.findOne(uuid);
  }

  async getAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async sendMessage(user: User, text: string, roomid: string): Promise<void> {
    //test

    const room = await this.chatroomRepository.find();

    if (!room) throw new Error("zjebany room");

    const message = new Message({
      text,
      user,
      room: room[0],
    });

    await this.messageRepository.insert(message);
    await this.pubSub.publish("user2", {
      ...message,
    });
  }

  async getMessageOwner(messageId: number): Promise<User> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
      relations: ["user"],
    });

    return message!.user;
  }
}

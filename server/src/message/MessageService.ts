import { PubSubEngine } from "type-graphql";
import { Inject, Service } from "typedi";
import { getRepository } from "typeorm";
import { Message } from "../db/entities/Message";
import { User } from "../db/entities/User";

@Service()
export class MessageService {
  private constructor(
    @Inject("PUB_SUB") private readonly pubSub: PubSubEngine
  ) {}

  private messageRepository = getRepository(Message);

  async getOne(uuid: string): Promise<Message | undefined> {
    return await this.messageRepository.findOne(uuid);
  }

  async getAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async sendMessage(user: User, text: string): Promise<void> {
    const message = new Message({
      text,
      user,
    });

    await this.messageRepository.insert(message);
    await this.pubSub.publish("MESSAGES", {
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

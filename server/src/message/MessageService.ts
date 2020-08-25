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

  async getOne(id: number): Promise<Message | undefined> {
    return await this.messageRepository.findOne(id);
  }

  async getAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async sendMessage(user: User, text: string): Promise<void> {
    const newMessage = new Message({
      text,
    });
    newMessage.user = user;

    const message = await this.messageRepository.save(newMessage);
    await this.pubSub.publish("MESSAGES", message);
  }

  async getMessageOwner(messageId: number): Promise<User> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
      relations: ["user"],
    });

    return message!.user;
  }
}

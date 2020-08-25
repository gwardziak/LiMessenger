import { PubSubEngine } from "type-graphql";
import { Inject, Service } from "typedi";
import { getRepository } from "typeorm";
import { Message } from "../db/entities/Message";

@Service()
export class MessageService {
  private constructor(
    @Inject("PUB_SUB") private readonly pubSub: PubSubEngine
  ) {}

  private messageRepository = getRepository(Message);

  async getAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async sendMessage(username: string, text: string): Promise<void> {
    const newMessage = new Message({
      text,
      //username,
    });

    const message = await this.messageRepository.save(newMessage);
    await this.pubSub.publish("MESSAGES", message);
  }
}

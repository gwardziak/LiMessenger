import { Publisher } from "type-graphql";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Message } from "../db/entities/Message";
import { IMessage } from "../models/Message";

@Service()
export class MessageService {
  private messageRepository = getRepository(Message);

  async getAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async sendMessage(publish: Publisher<IMessage>, text: string): Promise<void> {
    const newMessage = new Message({
      text,
      sender: "Robert Lewandowski",
    });

    const message = await this.messageRepository.save(newMessage);

    await publish(message);
  }
}

import DataLoader from "dataloader";
import { getRepository } from "typeorm";
import { Message } from "../db/entities/Message";
import { User } from "./../db/entities/User";

export const recipientLoader = () =>
  new DataLoader<number, User>(async (messageIds) => {
    const messages = await getRepository(
      Message
    ).findByIds(messageIds as number[], { relations: ["recipient"] });

    const messageIdToUser: Record<number, User> = {};
    messages.forEach((message) => {
      messageIdToUser[message.id] = message.recipient;
    });

    const sortedRecipients = messageIds.map(
      (messageId) => messageIdToUser[messageId]
    );

    return sortedRecipients;
  });

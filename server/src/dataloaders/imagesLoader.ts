import DataLoader from "dataloader";
import { getRepository } from "typeorm";
import { Image } from "../db/entities/Image";
import { Message } from "../db/entities/Message";

export const imagesLoader = () =>
  new DataLoader<number, Image[]>(async (messageIds) => {
    const messages = await getRepository(Message).findByIds(
      messageIds as number[],
      { relations: ["images"] }
    );

    const messageIdToImages: Record<number, Image[]> = {};

    messages.forEach((message) => {
      messageIdToImages[message.id] = message.images!;
    });

    const sortedImages = messageIds.map(
      (messageId) => messageIdToImages[messageId]
    );

    return sortedImages;
  });

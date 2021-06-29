import DataLoader from "dataloader";
import { getRepository } from "typeorm";
import { File } from "../db/entities/File";
import { Message } from "../db/entities/Message";

export const filesLoader = () =>
  new DataLoader<number, File[]>(async (messageIds) => {
    const messages = await getRepository(Message).findByIds(
      messageIds as number[],
      { relations: ["files"] }
    );

    const messageIdToFiles: Record<number, File[]> = {};

    messages.forEach((message) => {
      messageIdToFiles[message.id] = message.files!;
    });

    const sortedFiles = messageIds.map(
      (messageId) => messageIdToFiles[messageId]
    );

    return sortedFiles;
  });

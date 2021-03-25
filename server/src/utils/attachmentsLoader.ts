import DataLoader from "dataloader";
import { getRepository } from "typeorm";
import { Attachment } from "../db/entities/Attachment";
import { Message } from "../db/entities/Message";

export const attachmentsLoader = () =>
  new DataLoader<number, Attachment[]>(async (messageIds) => {
    const messages = await getRepository(
      Message
    ).findByIds(messageIds as number[], { relations: ["attachments"] });

    const messageIdToAttachments: Record<number, Attachment[]> = {};

    messages.forEach((message) => {
      messageIdToAttachments[message.id] = message.attachments!;
    });

    const sortedAttachments = messageIds.map(
      (messageId) => messageIdToAttachments[messageId]
    );

    return sortedAttachments;
  });

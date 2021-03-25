import DataLoader from "dataloader";
import { getRepository } from "typeorm";
import { Attachment } from "../db/entities/Attachment";

export const linkLoader = () =>
  new DataLoader<number, string>(async (attachmentIds) => {
    const attachments = await getRepository(
      Attachment
    ).findByIds(attachmentIds as number[], { relations: ["participantA"] });

    const attachmentIdToLink: Record<number, string> = {};
    attachments.forEach((attachment) => {
      attachmentIdToLink[attachment.id] = `attachment/${
        attachment!.participantA.uuid
      }/${attachment!.uuid}`;
    });

    const sortedLinks = attachmentIds.map(
      (attachmentId) => attachmentIdToLink[attachmentId]
    );
    return sortedLinks;
  });

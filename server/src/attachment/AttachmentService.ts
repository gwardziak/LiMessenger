import { Stream } from "stream";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Attachment } from "../db/entities/Attachment";
import { User } from "../db/entities/User";

export namespace AttachmentService {
  export type upload = {
    createReadStream: () => Stream;
    filename: string;
    mimetype: string;
    encoding: string;
  };
  export type PaginateAttachments = {
    friendUuid: string;
    limit: number;
    cursor?: string | null;
    isImage: boolean;
  };
}

@Service()
export class AttachmentService {
  private attachmentRepository = getRepository(Attachment);

  async getAll(
    me: User,
    options: AttachmentService.PaginateAttachments
  ): Promise<{
    attachments: Attachment[];
    hasMore: boolean;
  }> {
    const realLimit = Math.min(50, options.limit);
    const realLimitPlusOne = realLimit + 1;

    let has = "LIKE";
    if (!options.isImage) {
      has = "NOT LIKE";
    }

    const qb = this.attachmentRepository
      .createQueryBuilder("attachments")
      .select([
        "attachments.id",
        "attachments.uuid",
        "attachments.name",
        "attachments.mimetype",
        "attachments.createdAt",
        "attachments.updatedAt",
        "attachments.height",
        "attachments.width",
      ])
      .leftJoin("attachments.participantA", "participantA")
      .leftJoin("attachments.participantB", "participantB")
      .orderBy("attachments.id", "DESC")
      .take(realLimitPlusOne)
      .where(
        `
      (
        (participantA.uuid = :recipientUuid AND participantB.id = :senderId)
        OR
        (participantA.id = :senderId AND participantB.uuid = :recipientUuid)
      ) AND attachments.mimetype ${has} "%image%"
        `,
        {
          senderId: me.id,
          recipientUuid: options.friendUuid,
        }
      );

    if (options.cursor) {
      qb.andWhere(
        "attachments.id < (SELECT id from attachment where uuid = :cursor)",
        {
          cursor: options.cursor,
        }
      );
    }

    const attachments = await qb.getMany();

    return {
      attachments: attachments.slice(0, realLimit),
      hasMore: attachments.length === realLimitPlusOne,
    };
  }
}

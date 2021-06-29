import { Service } from "typedi";
import { getRepository } from "typeorm";
import { User } from "../../db/entities/User";
import { File } from "./../../db/entities/File";

export namespace FileService {
  export type FilePagination = {
    friendUuid: string;
    limit: number;
    cursor?: string | null;
  };

  export type Attachment = {
    participantA: User;
    participantB: User;
    name: string;
    file: string;
    mimetype: string;
  };
}

@Service()
export class FileService {
  private fileRepository = getRepository(File);

  createFile(attachment: FileService.Attachment): File {
    return new File({
      ...attachment,
      file: Buffer.from(attachment.file, "binary"),
    });
  }

  async get(
    user: User,
    options: FileService.FilePagination
  ): Promise<{
    files: File[];
    hasMore: boolean;
  }> {
    const realLimit = Math.min(50, options.limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = this.fileRepository
      .createQueryBuilder("file")
      .select([
        "file.id",
        "file.uuid",
        "file.name",
        "file.mimetype",
        "file.createdAt",
        "file.updatedAt",
      ])
      .leftJoin("file.participantA", "participantA")
      .leftJoin("file.participantB", "participantB")
      .orderBy("file.id", "DESC")
      .take(realLimitPlusOne)
      .where(
        `
        (participantA.uuid = :recipientUuid AND participantB.id = :senderId)
        OR
        (participantA.id = :senderId AND participantB.uuid = :recipientUuid)
        `,
        {
          senderId: user.id,
          recipientUuid: options.friendUuid,
        }
      );

    if (options.cursor) {
      qb.andWhere("file.id < (SELECT id from file where uuid = :cursor)", {
        cursor: options.cursor,
      });
    }

    const files = await qb.getMany();

    return {
      files: files.slice(0, realLimit),
      hasMore: files.length === realLimitPlusOne,
    };
  }
}

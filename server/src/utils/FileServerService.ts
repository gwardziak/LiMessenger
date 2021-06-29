import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Image } from "../db/entities/Image";
import { File } from "./../db/entities/File";

export namespace FileServerService {
  export type Attachment = {
    name: string;
    mimetype: string;
    attachment: Buffer;
  };
}

@Service()
export class FileServerService {
  private imageRepository = getRepository(Image);
  private fileRepository = getRepository(File);

  async getOne(
    participant: string,
    attachment: string
  ): Promise<FileServerService.Attachment> {
    if (attachment.startsWith("min")) {
      const image = attachment.substring(3);

      return await this.imageRepository
        .createQueryBuilder("attachment")
        .leftJoinAndSelect("attachment.participantA", "participantA")
        .leftJoinAndSelect("attachment.participantB", "participantB")
        .select(["name", "mimetype", "attachment.minImage AS attachment"])
        .where(
          `(participantA.uuid = :participant AND attachment.uuid = :image) OR
          (participantB.uuid = :participant AND attachment.uuid = :image)`,
          {
            participant,
            image,
          }
        )
        .getRawOne();
    }

    if (attachment.startsWith("orginal")) {
      const image = attachment.substring(7);

      return await this.imageRepository
        .createQueryBuilder("attachment")
        .leftJoinAndSelect("attachment.participantA", "participantA")
        .leftJoinAndSelect("attachment.participantB", "participantB")
        .select(["name", "mimetype", "attachment.image AS attachment"])
        .where(
          `(participantA.uuid = :participant AND attachment.uuid = :image) OR
            (participantB.uuid = :participant AND attachment.uuid = :image)`,
          {
            participant,
            image,
          }
        )
        .getRawOne();
    }

    return await this.fileRepository
      .createQueryBuilder("file")
      .leftJoinAndSelect("file.participantA", "participantA")
      .leftJoinAndSelect("file.participantB", "participantB")
      .select(["name", "mimetype", "file.file AS attachment"])
      .where(
        `(participantA.uuid = :participant AND file.uuid = :attachment) OR
        (participantB.uuid = :participant AND file.uuid = :attachment)`,
        {
          participant,
          attachment,
        }
      )
      .getRawOne();
  }
}

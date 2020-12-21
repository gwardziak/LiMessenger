import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Attachment } from "../db/entities/Attachment";

@Service()
export class FileServerService {
  private attachmentRepository = getRepository(Attachment);

  async getOne(
    participant: string,
    attachment: string
  ): Promise<Attachment | undefined> {
    return await this.attachmentRepository
      .createQueryBuilder("file")
      .leftJoinAndSelect("file.participantA", "participantA")
      .leftJoinAndSelect("file.participantB", "participantB")
      .where(
        `(participantA.uuid = :participant AND file.uuid = :attachment) OR
            (participantB.uuid = :participant AND file.uuid = :attachment)`,
        {
          participant,
          attachment,
        }
      )
      .getOne();
  }
}

import { Stream } from "stream";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Attachment } from "../db/entities/Attachment";

export namespace AttachmentService {
  export type upload = {
    createReadStream: Stream;
    filename: string;
    mimetype: string;
    encoding: string;
  };
}

@Service()
export class AttachmentService {
  private attachmentRepository = getRepository(Attachment);

  async upload(files: AttachmentService.upload[]) {
    console.log(files);
    // return await this.messageRepository.findOne({ where: { uuid } });
  }
}

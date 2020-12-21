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
}

@Service()
export class AttachmentService {
  private attachmentRepository = getRepository(Attachment);

  async upload(
    sender: User,
    recipient: User,
    { createReadStream, filename, mimetype }: AttachmentService.upload
  ) {
    return new Promise<Attachment>((resolve, reject) => {
      const readStream = createReadStream();
      (readStream as any).setEncoding("binary");

      let file: string = "";

      readStream.once("error", (err) => {
        file = "";
        return reject(err);
      });
      readStream.on("data", (chunk) => (file += chunk));
      readStream.on("end", async () => {
        const attachment = new Attachment({
          participantA: sender,
          participantB: recipient,
          name: filename,
          attachment: Buffer.from(file, "binary"),
          mimetype,
        });
        // await this.attachmentRepository.insert(attachment);
        return resolve(attachment);
        // return resolve(true);
        // return resolve(Buffer.from(data, "binary"));
      });
    });
  }

  async link(id: number): Promise<string> {
    const attachment = await this.attachmentRepository.findOne({
      where: { id },
      relations: ["participantA"],
    });

    return `attachment/${attachment!.participantA.uuid}/${attachment!.uuid}`;
  }
}

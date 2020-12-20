import { createWriteStream } from "fs";
import { Stream } from "stream";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Attachment } from "../db/entities/Attachment";

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

  async upload(files: AttachmentService.upload[]) {
    // console.log(files, "files");
    const { createReadStream, encoding, filename } = files[0];
    // const res = await this.attachmentRepository.find();

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    );

    // let stream = createReadStream;
    // let path = "/tmp/" + filename;

    // return new Promise((resolve, reject) =>
    //   stream
    //     .on("error", (error) => {
    //       console.log(error, "err");
    //       reject(error);
    //     })
    //     .on("data", (chunk: any) => {
    //       console.log("received " + chunk.length + "bytes of data");
    //     })
    //     .pipe(fs.createWriteStream(path))
    //     .on("error", (error) => reject(error))
    //     .on("finish", () => resolve(console.log("resolved")))
    // );

    // return new Promise((resolve, reject) => {
    //   createReadStream
    //     .on("error", (error: any) => reject(error))
    //     .on("finish", async () => {
    //       resolve(
    //         await this.attachmentRepository.insert(
    //           new Attachment({
    //             attachment: Buffer.from(files[0].createReadStream),
    //           })
    //         )
    //       );
    //     });
    // });

    //
    // console.log(res, "response");

    // return new Promise((resolve, reject) => {
    //   console.log("me");
    //   createReadStream
    //     .on("error", (error) => reject(error))
    //     .on("finish", () => {
    //       // file.filename = newFilename;
    //       // const media = this.repository.create({
    //       //   ...file,
    //       console.log("saved");
    //     });

    //   // resolve(this.repository.save(media));
    // });
    // });
    // const attachment = new Attachment({
    //   attachment: files[0].createReadStream,
    // });
    // const result = await this.attachmentRepository.save(attachment);
    // console.log(files);
    // console.log(result);
    // console.log(await this.attachmentRepository.find(), "attachments");
    // return await this.messageRepository.findOne({ where: { uuid } });
    // return new Promise(
    //   (resolve, reject) =>
    //     stream.on("data", (chunk) => {
    //       console.log("received " + chunk.length + "bytes of data");
    //     })

    //   // .on('error', error => {
    //   //   if (stream.truncated)
    //   //     // Delete the truncated file
    //   //     fs.unlinkSync(path)
    //   //   reject(error)
    //   // })

    //   // .pipe(fs.createWriteStream(path))
    //   // // .on('error', error => reject(error))
    //   // .on('finish', () => resolve({
    //   //   path, filename, mimetype, encoding
    //   // }))
    // );

    // const { stream, encoding } = await file;

    // const stream = files[0].createReadStream;
    // const file = files[0];

    // const res = new Promise((resolve, reject) => {
    //   stream
    //     .on("error", (error) => reject(error))
    //     .on("finish", () => {
    //       const media = new Attachment({
    //         //@ts-ignore
    //         attachment: files[0],
    //       });

    //       resolve(this.attachmentRepository.save(media));
    //     });
    // });
    // console.log(res, "res");
  }
}

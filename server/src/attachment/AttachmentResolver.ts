import { GraphQLUpload } from "graphql-upload";
import { Stream } from "stream";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { Attachment } from "../db/entities/Attachment";
import { User } from "../db/entities/User";
import { MyContext } from "../models/MyContext";
import { AttachmentService } from "./AttachmentService";

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@Resolver()
export class AttachmentResolver {
  private constructor(private readonly attachmentService: AttachmentService) {}
  private attachmentRepository = getRepository(Attachment);
  private userRepository = getRepository(User);

  @Mutation(() => Boolean)
  async uploadAttachment(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename }: Upload,
    @Ctx() { authUser }: MyContext
  ) {
    const user = await this.userRepository.findOne({
      where: { uuid: "8fa066d1-a47f-4f18-b4e2-c27579851866" },
    });

    return new Promise<Buffer | boolean>((resolve, reject) => {
      const readStream = createReadStream();
      (readStream as any).setEncoding("binary");

      let file: string = "";

      readStream.once("error", (err) => {
        file = "";
        return reject(err);
      });
      readStream.on("data", (chunk) => (file += chunk));
      readStream.on("end", async () => {
        await this.attachmentRepository.insert(
          new Attachment({
            participantA: authUser,
            participantB: user!,
            name: filename,
            attachment: Buffer.from(file, "binary"),
          })
        );
        resolve(true);
        // return resolve(Buffer.from(data, "binary"));
      });
    });
  }
}

// import { GraphQLUpload } from "graphql-upload";
// import { Stream } from "stream";
// import { Arg, Mutation, Resolver } from "type-graphql";
// import { getRepository } from "typeorm";
// import { Attachment } from "../db/entities/Attachment";
// import { AttachmentService } from "./AttachmentService";

// export interface Upload {
//   filename: string;
//   mimetype: string;
//   encoding: string;
//   createReadStream: () => Stream;
// }

// @Resolver()
// export class AttachmentResolver {
//   private constructor(private readonly attachmentService: AttachmentService) {}
//   private attachmentRepository = getRepository(Attachment);

//   @Mutation(() => Boolean)
//   async uploadAttachment(
//     @Arg("file", () => GraphQLUpload)
//     { createReadStream, filename, encoding, mimetype }: Upload
//   ) {
//     return new Promise<Buffer | boolean>((resolve, reject) => {
//       const readStream = createReadStream();
//       (readStream as any).setEncoding("binary");

//       let file: string = "";

//       readStream.once("error", (err) => {
//         file = "";
//         return reject(err);
//       });
//       readStream.on("data", (chunk) => (file += chunk));
//       readStream.on("end", async () => {
//         await this.attachmentRepository.insert(
//           new Attachment({ attachment: Buffer.from(file, "binary") })
//         );
//         resolve(true);
//         // return resolve(Buffer.from(data, "binary"));
//       });
//     });
//   }
// }

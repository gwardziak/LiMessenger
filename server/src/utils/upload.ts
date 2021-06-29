import { Stream } from "stream";

export namespace Upload {
  export type Source = {
    createReadStream: () => Stream;
    filename: string;
    mimetype: string;
    encoding: string;
  };
  export type File = {
    name: string;
    file: string;
    mimetype: string;
  };
}

export const upload = async ({
  createReadStream,
  filename,
  mimetype,
}: Upload.Source) => {
  return new Promise<Upload.File>((resolve, reject) => {
    const readStream = createReadStream();
    (readStream as any).setEncoding("binary");

    let file: string = "";

    readStream.once("error", (err) => {
      file = "";
      return reject(err);
    });

    readStream.on("data", (chunk) => (file += chunk));
    readStream.on("end", async () => {
      const newFile = {
        name: filename,
        file,
        mimetype,
      };

      return resolve(newFile);
    });
  });
};

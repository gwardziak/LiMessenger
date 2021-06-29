import DataLoader from "dataloader";
import { getRepository } from "typeorm";
import { File } from "./../db/entities/File";

export const fileLinkLoader = () =>
  new DataLoader<number, string>(async (fileIds) => {
    const files = await getRepository(File).findByIds(fileIds as number[], {
      relations: ["participantA"],
    });

    const fileIdToLink: Record<number, string> = {};
    files.forEach((file) => {
      fileIdToLink[file.id] = `attachment/${file!.participantA.uuid}/${
        file!.uuid
      }`;
    });

    const sortedLinks = fileIds.map((fileId) => fileIdToLink[fileId]);

    return sortedLinks;
  });

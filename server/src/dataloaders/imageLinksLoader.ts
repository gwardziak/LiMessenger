import DataLoader from "dataloader";
import { getRepository } from "typeorm";
import { Image } from "./../db/entities/Image";

export const imageLinksLoader = () =>
  new DataLoader<number, { orginal: string; min: string | null }>(
    async (imageIds) => {
      const images = await getRepository(Image).findByIds(
        imageIds as number[],
        {
          relations: ["participantA"],
        }
      );

      const imageIdToLinks: Record<
        number,
        { orginal: string; min: string | null }
      > = {};
      images.forEach((image) => {
        imageIdToLinks[image.id] = {
          orginal: `attachment/${image!.participantA.uuid}/orginal${
            image!.uuid
          }`,
          min: image.minImage
            ? `attachment/${image!.participantA.uuid}/min${image!.uuid}`
            : null,
        };
      });

      const sortedLinks = imageIds.map((imageId) => imageIdToLinks[imageId]);

      return sortedLinks;
    }
  );

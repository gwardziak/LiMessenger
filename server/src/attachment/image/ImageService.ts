import sharp from "sharp";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Image } from "../../db/entities/Image";
import { User } from "../../db/entities/User";

export namespace ImageService {
  export type ImagePagination = {
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
export class ImageService {
  private imageRepository = getRepository(Image);

  async createImage(attachment: ImageService.Attachment): Promise<Image> {
    const imageBuffer = Buffer.from(attachment.file, "binary");

    const { width, height } = await sharp(imageBuffer).metadata();

    if (!(height && width)) {
      throw new Error("Error during getting image metadata");
    }

    if (height > 400) {
      const { data, info } = await sharp(imageBuffer)
        .resize({ height: 400 })
        .toBuffer({ resolveWithObject: true });

      return new Image({
        ...attachment,
        image: imageBuffer,
        minWidth: info.width,
        minHeight: info.height,
        minImage: data,
      });
    }

    return new Image({
      ...attachment,
      image: imageBuffer,
      minWidth: width!,
      minHeight: height!,
      minImage: null,
    });
  }

  async get(
    user: User,
    options: ImageService.ImagePagination
  ): Promise<{
    images: Image[];
    hasMore: boolean;
  }> {
    const realLimit = Math.min(50, options.limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = this.imageRepository
      .createQueryBuilder("image")
      .select([
        "image.id",
        "image.uuid",
        "image.name",
        "image.mimetype",
        "image.minWidth",
        "image.minHeight",
        "image.createdAt",
        "image.updatedAt",
      ])
      .leftJoin("image.participantA", "participantA")
      .leftJoin("image.participantB", "participantB")
      .orderBy("image.id", "DESC")
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
      qb.andWhere("image.id < (SELECT id from image where uuid = :cursor)", {
        cursor: options.cursor,
      });
    }

    const images = await qb.getMany();

    return {
      images: images.slice(0, realLimit),
      hasMore: images.length === realLimitPlusOne,
    };
  }
}

import { PubSubEngine } from "type-graphql";
import { Inject, Service } from "typedi";
import { getRepository } from "typeorm";
import { Message } from "../db/entities/Message";
import { User } from "../db/entities/User";
import { ChatroomService } from "./../chatroom/ChatroomService";
import { Chatroom } from "./../db/entities/Chatroom";

export namespace MessageService {
  export type SendMessage = {
    recipientUuid: string;
    text: string;
  };
}

@Service()
export class MessageService {
  private constructor(
    @Inject("PUB_SUB") private readonly pubSub: PubSubEngine,
    private readonly chatroomService: ChatroomService
  ) {}
  private messageRepository = getRepository(Message);
  private userRepository = getRepository(User);
  private chatroomRepository = getRepository(Chatroom);

  async getOne(uuid: string): Promise<Message | undefined> {
    return await this.messageRepository.findOne({ where: { uuid } });
  }

  async getAll(
    me: User,
    friendUuid: string,
    cursor: string | null,
    limit: number
  ): Promise<Message[]> {
    const realLimit = Math.min(50, limit);

    const qb = this.messageRepository
      .createQueryBuilder("messages")
      .leftJoinAndSelect("messages.sender", "sender")
      .leftJoinAndSelect("messages.recipient", "recipient")
      .where(
        "sender.uuid = :recipientUuid AND recipient.id = :senderId OR sender.id = :senderId AND recipient.uuid = :recipientUuid",
        {
          senderId: me.id,
          recipientUuid: friendUuid,
        }
      )
      .orderBy("messages.createdAt", "DESC")
      .take(realLimit);
    if (cursor) {
      qb.andWhere("DATETIME(messages.createdAt) < DATETIME(:cursor)", {
        cursor,
      });
    }

    return await qb.getMany();
  }
  // const messages = await this.messageRepository
  //   .createQueryBuilder("messages")
  //   .leftJoinAndSelect("messages.sender", "sender")
  //   .leftJoinAndSelect("messages.recipient", "recipient")
  //   .where("sender.uuid = :recipientUuid AND recipient.id = :senderId", {
  //     senderId: me.id,
  //     recipientUuid: friendUuid,
  //   })
  //   .orWhere("sender.id = :senderId AND recipient.uuid = :recipientUuid", {
  //     senderId: me.id,
  //     recipientUuid: friendUuid,
  //   })
  //   .orderBy("messages.createdAt", "DESC")
  //   .andWhere("DATETIME(messages.createdAt) < DATETIME(:cursor)", {
  //     cursor: cursorId,
  //   })
  //   .take(realLimit)
  //   .getMany();

  // .where("sender.id = :senderId AND recipient.uuid = :recipientUuid", {
  //   senderId: me.id,
  //   recipientUuid: friendUuid,
  // })

  //   yyy, v,z yy  yyy  yy xxx
  async firstMessages(user: User): Promise<Message[]> {
    return await this.messageRepository
      .createQueryBuilder("messages")
      .leftJoinAndSelect("messages.sender", "sender")
      .leftJoinAndSelect("messages.recipient", "recipient")
      .where(`sender.id = :participantId OR recipient.id = :participantId`, {
        participantId: user.id,
      })
      .groupBy("recipient.id")
      .addGroupBy("sender.id")
      .addSelect("MAX(messages.createdAt)")
      .getMany();
  }

  async sendMessage(
    sender: User,
    options: MessageService.SendMessage
  ): Promise<void> {
    let room = await this.chatroomRepository
      .createQueryBuilder("chatroom")
      .leftJoinAndSelect("chatroom.participantA", "participantA")
      .leftJoinAndSelect("chatroom.participantB", "participantB")
      .where(
        `(participantA.id = :participantAId AND participantB.uuid = :participantBUuid) OR
      (participantA.uuid = :participantBUuid AND participantB.id = :participantAId)`,
        { participantAId: sender.id, participantBUuid: options.recipientUuid }
      )
      .getOne();

    if (!room) {
      const user = await this.userRepository.findOne({
        where: { uuid: options.recipientUuid },
      });
      if (!user) throw new Error("Selected chat doesnt exist");

      room = await this.chatroomService.createChatroom(user, sender);
    }

    const message = new Message({
      text: options.text,
      sender,
      room,
      recipient:
        room.participantA.id === sender.id
          ? room.participantB
          : room.participantA,
    });

    await this.messageRepository.insert(message);
    await this.pubSub.publish("NEW_MESSAGE", message);
  }

  async sender(id: number): Promise<User> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ["sender"],
    });
    return message!.sender;
  }

  async recipient(id: number): Promise<User> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ["recipient"],
    });
    return message!.recipient;
  }
}

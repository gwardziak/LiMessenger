import { Entity, Index, ManyToOne } from "typeorm";
import { User } from "./User";

export namespace Chatroom {
  export type Options = {
    participantA: User;
    participantB: User;
  };
}

@Entity()
@Index(["participantA", "participantB"], { unique: true })
export class Chatroom {
  @ManyToOne(() => User, {
    nullable: false,
    primary: true,
  })
  public readonly participantA!: User;

  @ManyToOne(() => User, {
    nullable: false,
    primary: true,
  })
  public readonly participantB!: User;

  constructor(options: Chatroom.Options) {
    if (options) {
      let { participantA, participantB } = options;
      if (options.participantA.id > options.participantB.id) {
        participantA = options.participantB;
        participantB = options.participantA;
      }

      Object.assign(this, {
        ...options,
        participantA,
        participantB,
      });
    }
  }
}

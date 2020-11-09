import { Entity, Index, ManyToOne } from "typeorm";
import { User } from "./User";

export namespace Friendship {
  export type Options = {
    userA: User;
    userB: User;
  };
}

@Entity()
@Index(["userA", "userB"], { unique: true })
export class Friendship {
  @ManyToOne((type) => User, {
    nullable: false,
    primary: true,
    eager: true,
  })
  public readonly userA!: User;

  @ManyToOne((type) => User, { nullable: false, primary: true, eager: true })
  public readonly userB!: User;

  constructor(options: Friendship.Options) {
    if (options) {
      let userA, userB;
      if (options.userA.id < options.userB.id) {
        userA = options.userA;
        userB = options.userB;
      } else {
        userA = options.userB;
        userB = options.userA;
      }

      Object.assign(this, { ...options, userA, userB });
    }
  }
}

import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

export namespace Friendship {
  export type Options = {
    userA: number;
    userB: number;
  };
}

@Entity()
@Unique(["userA", "userB"])
export class Friendship implements Friendship.Options {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "userA" })
  userA!: number;

  @Column({ name: "userB" })
  userB!: number;

  constructor(options: Friendship.Options) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

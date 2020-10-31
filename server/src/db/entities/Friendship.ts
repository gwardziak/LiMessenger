import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "./User";

export namespace Friendship {
  export type Options = {
    userA: number;
    userB: number;
    users: User[];
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

  @ManyToMany(() => User)
  @JoinTable()
  users!: User[];

  constructor(options: Friendship.Options) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

/*


import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "./User";

export namespace Friendship {
  export type Options = {
    userA: number;
    userB: number;
    users: User[];
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

  @ManyToMany(() => User)
  @JoinTable()
  users!: User[];

  constructor(options: Friendship.Options) {
    if (options) {
      Object.assign(this, options);
    }
  }
}


*/

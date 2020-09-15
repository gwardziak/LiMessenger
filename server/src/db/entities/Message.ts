import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

export namespace Message {
  export type Options = {
    text: string;
    user: User;
  };
}

@Entity()
export class Message implements Message.Options {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  @Generated("uuid")
  uuid!: string;

  @Column()
  text!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne((type) => User, (user) => user.messages)
  user!: User;

  constructor(options: Message.Options) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

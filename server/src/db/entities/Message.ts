import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Chatroom } from "./Chatroom";
import { User } from "./User";

export namespace Message {
  export type Options = {
    text: string;
    room: Chatroom;
    sender: User;
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

  @ManyToOne((type) => User, (sender) => sender.messages)
  sender!: User;

  @ManyToOne((type) => Chatroom, {
    nullable: false,
  })
  public readonly room!: Chatroom;

  constructor(options: Message.Options) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

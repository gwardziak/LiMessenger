import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
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
    recipient: User;
  };
}

@Entity()
export class Message implements Message.Options {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  @Index()
  @Generated("uuid")
  uuid!: string;

  @Column()
  text!: string;

  @Index()
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User)
  sender!: User;

  @ManyToOne(() => User, {
    nullable: false,
  })
  public readonly recipient!: User;

  @ManyToOne(() => Chatroom, {
    nullable: false,
  })
  public readonly room!: Chatroom;

  constructor(options: Message.Options) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

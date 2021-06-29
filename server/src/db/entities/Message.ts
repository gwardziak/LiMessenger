import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Chatroom } from "./Chatroom";
import { File } from "./File";
import { Image } from "./Image";
import { User } from "./User";

export namespace Message {
  export type Options = {
    text: string;
    room: Chatroom;
    sender: User;
    recipient: User;
    files?: File[];
    images?: Image[];
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
  @Column()
  createdAt!: Date;

  @BeforeInsert()
  private setCreateDate(): void {
    this.createdAt = new Date();
  }

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

  @OneToMany(() => Image, (image) => image.message, {
    cascade: true,
  })
  public images?: Image[];

  @OneToMany(() => File, (file) => file.message, {
    cascade: true,
  })
  public files?: File[];

  constructor(options: Message.Options) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

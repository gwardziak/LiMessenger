import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Message } from "./Message";
import { User } from "./User";

export namespace Image {
  export type Options = {
    name: string;
    image: Buffer;
    minImage: Buffer | null;
    participantA: User;
    participantB: User;
    mimetype: string;
    minWidth: number;
    minHeight: number;
    message?: Message;
  };
}

@Entity()
export class Image implements Image.Options {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  @Generated("uuid")
  uuid!: string;

  @Column()
  name!: string;

  @Column({ type: "blob" })
  image!: Buffer;

  @Column({ type: "blob", nullable: true })
  minImage!: Buffer | null;

  @Column()
  mimetype!: string;

  @Column()
  minWidth!: number;

  @Column()
  minHeight!: number;

  @Column()
  createdAt!: Date;

  @BeforeInsert()
  private setCreateDate(): void {
    this.createdAt = new Date();
  }

  @UpdateDateColumn()
  updatedAt!: Date;

  @Index()
  @ManyToOne(() => Message, (message) => message.images, {
    nullable: false,
  })
  message!: Message;

  @ManyToOne(() => User, {
    nullable: false,
  })
  public readonly participantA!: User;

  @ManyToOne(() => User, {
    nullable: false,
  })
  public readonly participantB!: User;

  constructor(options: Image.Options) {
    if (options) {
      let participantA, participantB;
      if (options.participantA.id < options.participantB.id) {
        participantA = options.participantA;
        participantB = options.participantB;
      } else {
        participantA = options.participantB;
        participantB = options.participantA;
      }

      Object.assign(this, { ...options, participantA, participantB });
    }
    Object.assign(this, options);
  }
}

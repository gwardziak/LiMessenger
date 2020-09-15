import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Message } from "./Message";

export namespace User {
  export type Options = {
    username: string;
    password: string;
    email: string;
    authToken: string;
  };
}

@Entity()
export class User implements User.Options {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  @Generated("uuid")
  uuid!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  authToken!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: false })
  accountVerified!: boolean;

  @OneToMany((type) => Message, (message) => message.user)
  messages!: Message[];

  constructor(options: User.Options) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

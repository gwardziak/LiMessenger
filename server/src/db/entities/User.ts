import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export namespace User {
  export type Options = {
    username: string;
    password: string;
    email: string;
    authToken: string;
  };
}

@Index(["uuid"], { unique: true })
@Entity()
export class User implements User.Options {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  @Generated("uuid")
  uuid!: string;

  @Index()
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

  constructor(options: User.Options) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

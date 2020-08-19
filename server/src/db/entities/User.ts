import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../../models/User";
import { Message } from "./Message";

type UserEntity = Omit<IUser, "id">;

@Entity()
export class User implements UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column({ unique: true })
  authToken!: string;

  @OneToMany((type) => Message, (message) => message.user)
  messages!: Message[];

  constructor(options: UserEntity) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IMessage } from "../../models/Message";
import { User } from "./User";

type IMessageEntity = Omit<IMessage, "id">;

@Entity()
export class Message implements IMessageEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @ManyToOne((type) => User, (user) => user.messages)
  user!: User;

  constructor(options: IMessageEntity) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

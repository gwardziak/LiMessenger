import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IMessage } from "../../models/Message";

type EntityMessage = Omit<IMessage, "id">;

@Entity()
export class Message implements EntityMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sender!: string;

  @Column()
  text!: string;

  constructor(options: EntityMessage) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

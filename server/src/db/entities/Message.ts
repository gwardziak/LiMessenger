import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IMessageEntity } from "../../models/Message";

@Entity()
export class Message implements IMessageEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sender!: string;

  @Column()
  text!: string;

  constructor(options: IMessageEntity) {
    if (options) {
      Object.assign(this, options);
    }
  }
}

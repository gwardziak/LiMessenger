export interface IMessage {
  id: number;
  uuid: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;

  userId: number;
}

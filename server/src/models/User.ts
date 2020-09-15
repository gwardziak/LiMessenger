import { IMessage } from "./Message";

export interface IUser {
  id: number;
  uuid: string;
  username: string;
  password: string;
  email: string;
  authToken: string;
  createdAt: Date;
  updatedAt: Date;
  accountVerified: boolean;

  messages: IMessage[];
}

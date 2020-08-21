export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  authToken: string;
}

export interface ISignUpArgs {
  name: string;
  password: string;
  email: string;
}

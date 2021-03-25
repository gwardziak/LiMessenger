import { Request, Response } from "express";
import { User } from "../db/entities/User";

export interface MyContext {
  req: Request;
  res: Response;
  user: User;
  assosiateWithUser: (user: User | null) => void;
  loaders: any;
}

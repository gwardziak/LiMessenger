import { Request, Response } from "express";
import { User } from "../db/entities/User";

export interface MyContext {
  req: Request;
  res: Response;
  authUser: User;
}

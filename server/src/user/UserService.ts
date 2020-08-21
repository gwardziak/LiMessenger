import { AuthenticationError, UserInputError } from "apollo-server-express";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { User } from "../db/entities/User";
import { IUser } from "./../models/User";
import { isDuplicateError } from "./../utils/isDuplicateError";

type Token = IUser["authToken"];

export namespace UserService {
  export type CreateUserOptions = {
    username: string;
    password: string;
    email: string;
  };
  export type LoginUserOptions = {
    login: string;
    password: string;
  };
}

@Service()
export class UserService {
  private readonly userRepository = getRepository(User);
  private readonly saltRounds: number = 10;

  private generateAuthToken(): string {
    return crypto.randomBytes(20).toString("hex");
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async createUser(userOptions: UserService.CreateUserOptions): Promise<User> {
    const user = new User({
      ...userOptions,
      password: await this.hashPassword(userOptions.password),
      authToken: this.generateAuthToken(),
    });

    try {
      await this.userRepository.insert(user);
      return user;
    } catch (err) {
      if (isDuplicateError(err, "user.authToken")) {
        this.createUser(user);
      }

      throw err;
    }
  }

  async login(loginOptions: UserService.LoginUserOptions): Promise<User> {
    const user = await this.userRepository.findOne({
      username: loginOptions.login,
    });

    if (!user) {
      throw new UserInputError("No user found with this login credentials.");
    }

    const hashInputPassowrd = await this.hashPassword(loginOptions.password);

    if (hashInputPassowrd === user.password) {
      throw new AuthenticationError("Invalid password.");
    }

    return user;
  }
}

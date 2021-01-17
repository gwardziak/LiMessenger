import { AuthenticationError, UserInputError } from "apollo-server-express";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Service } from "typedi";
import { getRepository, Like } from "typeorm";
import { User } from "../db/entities/User";
import { isDuplicateError } from "../utils/isDuplicateError";

export namespace UserService {
  export type CreateUser = {
    username: string;
    password: string;
    email: string;
  };
  export type Login = {
    login: string;
    password: string;
  };
  export type Token = string;
}

@Service()
export class UserService {
  private readonly userRepository = getRepository(User);
  private readonly saltRounds: number = 10;

  private generateAuthToken(): string {
    return crypto.randomBytes(20).toString("hex");
  }

  private async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  private async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  authorize(user: User | null): User | null {
    // console.log(user, "User ja pierdole");
    // you are not logged in
    if (!user) {
      return null;
    }

    return user;
  }

  async createUser(options: UserService.CreateUser): Promise<User> {
    const user = new User({
      ...options,
      password: await this.hash(options.password),
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

  async login(loginOptions: UserService.Login): Promise<UserService.Token> {
    const user = await this.userRepository.findOne({
      username: loginOptions.login,
    });

    if (!user) {
      throw new UserInputError(
        "The login that you've entered doesn't match any account."
      );
    }

    const isPasswordSimilar = await this.compareHash(
      loginOptions.password,
      user.password
    );

    if (!isPasswordSimilar) {
      throw new AuthenticationError("Invalid password.");
    }

    /*
    if (!user.accountVerified) {
      throw new UserInputError("Account not verified.");
    }
*/

    return user.authToken;
  }

  async findUsers(phase: string): Promise<User[]> {
    return await this.userRepository.find({
      username: Like(`%${phase}%`),
    });
  }
}

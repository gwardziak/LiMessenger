import { AuthenticationError, UserInputError } from "apollo-server-express";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Service } from "typedi";
import { getRepository, Like } from "typeorm";
import { User } from "../db/entities/User";
import { GraphQLServer } from "../GraphQLServer";
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
  export type Authorize = {
    token: string | null;
  };
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

  async verifyUserToken(token: string | null): Promise<User | null> {
    if (token) {
      const user = await getRepository(User).findOne({
        where: { authToken: token },
      });

      return !user ? null : user;
    }
    return null;
  }

  async me(user: User | null): Promise<User | null> {
    if (!user) {
      return null;
    }

    return user;
  }

  async authorize(
    options: UserService.Authorize,
    { assosiateWithUser }: GraphQLServer.Context
  ): Promise<User | null> {
    const user = await this.verifyUserToken(options.token);

    assosiateWithUser(user);

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

  async findUsers(user: User, phase: string): Promise<User[]> {
    const users = await this.userRepository.find({
      username: Like(`%${phase}%`),
    });

    return users.filter((filterUser) => filterUser.id !== user.id);
  }
}

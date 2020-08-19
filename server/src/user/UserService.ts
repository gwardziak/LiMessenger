import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { User } from "../db/entities/User";
import { SignUpArgs } from "./dto/SignUpArgs";

@Service()
export class UserService {
  private readonly userRepository = getRepository(User);
  private readonly saltRounds: number = 10;

  private generateAuthToken(): string {
    return crypto.randomBytes(20).toString("hex");
  }

  async createUser(userData: SignUpArgs): Promise<User> {
    const user = await this.userRepository
      .save({ ...userData, authToken: this.generateAuthToken() })
      .catch(async (err) => {
        if (err.errno === 19) await this.createUser(userData);

        throw new Error("User creation failed");
      });

    return user;
  }

  async signUp({ email, password, name }: SignUpArgs): Promise<string> {
    const isUser = await this.userRepository.findOne({ name });
    if (isUser) throw new Error(`Username ${name} already exist.`);

    const isEmail = await this.userRepository.findOne({ email });
    if (isEmail) throw new Error(`Email ${email} is already in use.`);

    const hashPassword = await bcrypt.hash(password, this.saltRounds);

    const user = await this.createUser({
      name,
      password: hashPassword,
      email,
    });

    return user.authToken;
  }
}

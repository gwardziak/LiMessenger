import bcrypt from "bcrypt";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { User } from "../db/entities/User";
import { SignUpArgs } from "./dto/SignUpArgs";

@Service()
export class UserService {
  private readonly userRepository = getRepository(User);
  private readonly saltRounds: number = 10;

  async signUp({ email, password, name }: SignUpArgs): Promise<void> {
    //TODO
    //check username/email/password

    const hashPassword = await bcrypt.hash(password, this.saltRounds);

    const createUser = new User({ email, password: hashPassword, name });

    const user = await this.userRepository.save(createUser);
  }
}

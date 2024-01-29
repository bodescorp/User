import { AppError } from "../../../../shared/errors/AppError";
import sendEmail from "../../../../shared/providers/MailProvider";
import { ICreateUserParams } from "../../dto/userDto";
import { usersRepository } from "../../repositories/UsersRepositories";
import { hash } from "bcryptjs";
import * as crypto from "crypto";

export default class CreateUserService {
  async execute({
    firstName,
    lastName,
    email,
    password,
    admin = false,
  }: ICreateUserParams) {
    const userAlreadyExists = await usersRepository.find({
      where: { email },
      // || { ra },
    });

    if (userAlreadyExists[0]) {
      throw AppError.badRequest(`User with email ${email} already exists!`);
    }

    const passwordHash = await hash(password, 8);

    const email_token = crypto.randomBytes(64).toString("hex");
    const codLogin = crypto.randomInt(100000, 999999);

    // sendEmail({
    //   to: email,
    //   subject: `Código de login`,
    //   text: `Código de login: ${codLogin}`,
    // });

    const user = usersRepository.create({
      email,
      firstName,
      lastName,
      password: passwordHash,
      email_token,
      codLogin,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

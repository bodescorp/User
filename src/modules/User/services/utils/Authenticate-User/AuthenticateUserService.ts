import { AppError } from "../../../../../shared/errors/AppError";
import { IAuthenticateParams } from "../../../dto/userDto";
import { usersRepository } from "../../../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
export default class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateParams) {
    const userExists = await usersRepository.findOneBy({ email });

    if (!userExists) {
      throw AppError.badRequest("Email/Password incorrect!");
    }
    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw AppError.badRequest("Email/Password incorrect!");
    }

    const token = sign(
      {
        email: userExists.email,
      },
      process.env.secretOrPrivateKey,
      {
        subject: userExists.email,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

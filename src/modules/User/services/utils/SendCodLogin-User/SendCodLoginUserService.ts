import { AppError } from "../../../../../shared/errors/AppError";
import { usersRepository } from "../../../repositories/UsersRepositories";
import * as crypto from "crypto";

export default class SendCodLoginUserService {
  async execute(email_token: string) {
    const user = await usersRepository.findOneBy({ email_token });

    if (!user) {
      throw AppError.badRequest(
        "Token invalido, entre em contato com o suporte"
      );
    }

    const codLogin = crypto.randomInt(100000, 999999);

    // sendEmail({
    //   to: email,
    //   subject: `Código de login`,
    //   text: `Código de login: ${codLogin}`,
    // });

    const { affected } = await usersRepository.update(
      { email: user.email },
      {
        codLogin,
      }
    );

    if (affected === 1) {
      const verify = await usersRepository.findOneBy({ email: user.email });
      return verify;
    }
  }
}

import { AppError } from "../../../../../shared/errors/AppError";
import { IVerifyEmailParams } from "../../../dto/userDto";
import { usersRepository } from "../../../repositories/UsersRepositories";

export default class VerifyEmailUserService {
  async execute({ email_token, codLogin }: IVerifyEmailParams) {
    const user = await usersRepository.findOneBy(
      { email_token } || { codLogin }
    );

    if (!user) {
      throw AppError.badRequest(
        "Token invalido, entre em contato com o suporte"
      );
    }
    if (!codLogin || codLogin !== user.codLogin) {
      throw AppError.badRequest("Codigo invalido");
    }
    const { affected } = await usersRepository.update(
      { email: user.email },
      {
        email_token: null,
        codLogin: null,
        email_verificado: true,
      }
    );

    if (affected === 1) {
      const verify = await usersRepository.findOneBy({ email: user.email });
      return verify;
    }
  }
}

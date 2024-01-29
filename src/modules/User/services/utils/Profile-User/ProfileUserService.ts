import { AppError } from "../../../../../shared/errors/AppError";
import { usersRepository } from "../../../repositories/UsersRepositories";
export default class ProfileUserService {
  async execute(user_email) {
    const userExists = await usersRepository.findOneBy({ email: user_email });

    if (!userExists) {
      throw AppError.badRequest("User not found!");
    }

    return userExists;
  }
}

import { AppError } from "../../../../shared/errors/AppError";
import { usersRepository } from "../../repositories/UsersRepositories";

export class DeleteUserService {
  async execute(email: string) {
    const userAlreadyExists = await usersRepository.findOneBy({ email });

    if (!userAlreadyExists) {
      throw AppError.badRequest("User not found!");
    }

    const { affected } = await usersRepository.delete({ email });
    if (!affected) {
      throw AppError.badRequest("User not deleted!");
    }

    return affected;
  }
}

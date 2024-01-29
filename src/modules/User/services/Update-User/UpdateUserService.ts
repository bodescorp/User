import { IUpdateUserParams } from "../../dto/userDto";
import { AppError } from "../../../../shared/errors/AppError";
import { usersRepository } from "../../repositories/UsersRepositories";
import { hash } from "bcryptjs";

export default class UpdateUserService {
  async execute(
    email: string,
    params: IUpdateUserParams,
    file: Express.Multer.File
  ) {
    const userAlreadyExists = await usersRepository.findOneBy({ email });

    if (!userAlreadyExists) {
      throw AppError.badRequest("User not found!");
    }

    const { password, ...filteredParams } = params;

    let passwordHash: string | undefined;

    if (password) {
      // Hash the password only if it is present in the request
      passwordHash = await hash(password, 8);
    }
    const urlImage = file
      ? `https://user-production-3da8.up.railway.app/files/${file.filename}`
      : undefined;

    const updateData: Record<string, unknown> = {};

    if (passwordHash) {
      updateData.password = passwordHash;
    }

    if (urlImage) {
      updateData.urlImage = urlImage;
    }

    Object.assign(updateData, filteredParams);

    const { affected } = await usersRepository.update({ email }, updateData);

    if (affected === 1) {
      return this.findUserByEmail(email);
    }

    throw AppError.badRequest("User not updated");
  }

  private async findUserByEmail(email: string) {
    const user = await usersRepository.findOneBy({ email });

    if (!user) {
      throw AppError.badRequest("User not found!");
    }

    return user;
  }
}

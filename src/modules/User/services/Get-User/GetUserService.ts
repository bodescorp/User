import { User } from "../../interfaces/User";
import { usersRepository } from "../../repositories/UsersRepositories";

export class GetUserService {
  async getUsers(): Promise<User[] | string> {
    const allUsers = await usersRepository.find();
    return allUsers;
  }
}

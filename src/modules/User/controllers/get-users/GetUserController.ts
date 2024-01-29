import { Request, Response } from "express";
import { User } from "../../interfaces/User";
import { GetUserService } from "../../services/Get-User/GetUserService";
import { AppError } from "../../../../shared/errors/AppError";
export class GetUserController {
  async handle(request: Request, response: Response): Promise<User[] | string> {
    const getUserService = new GetUserService();
    const allUsers = await getUserService.getUsers();
    throw AppError.ok(allUsers);
  }
}

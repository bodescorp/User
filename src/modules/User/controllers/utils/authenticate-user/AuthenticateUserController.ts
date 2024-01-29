import { Request, Response } from "express";
import AuthenticateUserService from "../../../services/utils/Authenticate-User/AuthenticateUserService";
import { AppError } from "../../../../../shared/errors/AppError";

export default class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute({
      email,
      password,
    });
    throw AppError.ok(token);
  }
}

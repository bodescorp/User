import { AppError } from "../../../../../shared/errors/AppError";
import { User } from "../../../interfaces/User";
import { Request, Response } from "express";
import ProfileUserService from "../../../services/utils/Profile-User/ProfileUserService";

export class ProfileUserController {
  async handle(request: Request, response: Response): Promise<User> {
    const email = request.user_id;

    if (!email) {
      throw AppError.badRequest("Missing User.");
    }

    const profileUserService = new ProfileUserService();

    const user = await profileUserService.execute(email);

    throw AppError.ok(user);
  }
}

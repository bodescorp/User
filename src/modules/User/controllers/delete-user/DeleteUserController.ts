import { User } from "../../interfaces/User";
import { AppError } from "../../../../shared/errors/AppError";
import { DeleteUserService } from "../../services/Delete-User/DeleteUserService";
import { Request, Response } from "express";

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<User> {
    const email = request.user_id;

    // const ra = parseInt(request.params.ra);

    if (!email) {
      throw AppError.badRequest("Missing Email User.");
    }

    const deleteUserService = new DeleteUserService();

    const user = await deleteUserService.execute(email);

    throw AppError.ok({
      message: "User Deleted",
      body: `User deleted ${user}`,
    });
  }
}

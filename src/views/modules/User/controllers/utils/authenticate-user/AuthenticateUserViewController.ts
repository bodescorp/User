import { Request, Response } from "express";
import AuthenticateUserService from "../../../../../../modules/User/services/utils/Authenticate-User/AuthenticateUserService";

export class AuthenticateUserViewController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    try {
      const token = await authenticateUserService.execute({
        email,
        password,
      });

      request.session.token = token;

      return response.redirect(`/dashboard/users`);
    } catch (error) {
      return response.render("login", { error: error });
    }
  }
}

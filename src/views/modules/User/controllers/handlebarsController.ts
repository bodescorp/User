import { Request, Response } from "express";
import ProfileUserService from "../../../../modules/User/services/utils/Profile-User/ProfileUserService";

export class HandlebarsController {
  home(request: Request, response: Response) {
    request.session.destroy((err) => {
      if (err) throw err;
    });
    return response.render("login");
  }
  async dashboard(request: Request, response: Response) {
    const { user_id } = request;
    const profile = new ProfileUserService();
    const user = await profile.execute(user_id);

    return response.render("index", { user });
  }

  signUp(request: Request, response: Response) {
    return response.render("signup");
  }
  verifyEmail(request: Request, response: Response) {
    const email_token = request.params.email_token as string;

    return response.render("verifyEmail", { email_token });
  }

  async profile(request: Request, response: Response) {
    const { user_id } = request;
    const profile = new ProfileUserService();
    const user = await profile.execute(user_id);

    return response.render("profile", { user });
  }

  async accountSettings(request: Request, response: Response) {
    const { user_id } = request;
    const profile = new ProfileUserService();
    const user = await profile.execute(user_id);

    return response.render("account-settings", { user });
  }
}

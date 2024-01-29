import { Request, Response } from "express";
import VerifyEmailUserService from "../../../../../../modules/User/services/utils/Verifyemail-User/VerifyemailUserService";

export default class VerifyEmailUserViewController {
  async handle(request: Request, response: Response) {
    const email_token = request.params.email_token as string;
    const codLogin = parseInt(request.body.codLogin);

    const verifyEmailUserService = new VerifyEmailUserService();

    try {
      const token = await verifyEmailUserService.execute({
        email_token,
        codLogin,
      });

      return response.redirect(`/dashboard/users/login`);
    } catch (error) {
      return response.render("verifyEmail", { error: error, email_token });
    }
  }
}

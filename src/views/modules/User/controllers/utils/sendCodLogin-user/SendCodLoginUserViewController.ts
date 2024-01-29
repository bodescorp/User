import { Request, Response } from "express";
import SendCodLoginUserService from "../../../../../../modules/User/services/utils/SendCodLogin-User/SendCodLoginUserService";

export default class SendCodLoginUserViewController {
  async handle(request: Request, response: Response) {
    const email_token = request.params.email_token as string;

    const sendCodLoginUserService = new SendCodLoginUserService();

    try {
      await sendCodLoginUserService.execute(email_token);

      return response.render("verifyEmail", {
        message: { statusCode: 200, body: "Resend" },
        email_token,
      });
    } catch (error) {
      return response.render("verifyEmail", { error: error, email_token });
    }
  }
}

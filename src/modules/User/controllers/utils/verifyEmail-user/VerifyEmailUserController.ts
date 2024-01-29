import { Request, Response } from "express";
import { AppError } from "../../../../../shared/errors/AppError";
import VerifyEmailUserService from "../../../services/utils/Verifyemail-User/VerifyemailUserService";

export default class VerifyEmailUserController {
  async handle(request: Request, response: Response) {
    const email_token = request.query.email_token as string;
    const { codLogin } = request.body;

    const verifyEmailUserService = new VerifyEmailUserService();

    const token = await verifyEmailUserService.execute({
      email_token,
      codLogin,
    });
    throw AppError.ok(token);
  }
}

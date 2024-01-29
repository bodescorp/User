import { Request, Response } from "express";
import { AppError } from "../../../../../shared/errors/AppError";
import SendCodLoginUserService from "../../../services/utils/SendCodLogin-User/SendCodLoginUserService";

export default class SendCodLoginUserController {
  async handle(request: Request, response: Response) {
    const email_token = request.query.email_token as string;

    const sendCodLoginUserService = new SendCodLoginUserService();

    const codLogin = await sendCodLoginUserService.execute(email_token);
    throw AppError.ok(codLogin);
  }
}

import { NextFunction, Request, Response } from "express";
import { usersRepository } from "../../../modules/User/repositories/UsersRepositories";

export default async function ensureVerifyEmailView(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const { email_verificado, email_token } = await usersRepository.findOneBy({
    email: user_id,
  });

  if (email_verificado) {
    return next();
  }

  return response.redirect(`/dashboard/users/verifyEmail/${email_token}`);
}

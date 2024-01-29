import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { usersRepository } from "../../modules/User/repositories/UsersRepositories";

export default async function ensureVerifyEmail(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const { email_verificado } = await usersRepository.findOneBy({
    email: user_id,
  });

  if (email_verificado) {
    return next();
  }

  throw AppError.unauthorized({
    error: "Unauthorized",
    message: "Email not verified",
  });
}

import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";
import { IPayload } from "../../modules/User/dto/userDto";

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authtoken = request.headers.authorization;

  if (!authtoken) {
    throw AppError.unauthorized({ message: "Token missing" });
  }
  const token = authtoken.startsWith("Bearer ")
    ? authtoken.slice(7)
    : authtoken;

  try {
    const { sub } = verify(token, process.env.secretOrPrivateKey) as IPayload;

    request.user_id = sub;

    next();
  } catch (error) {
    throw AppError.unauthorized({
      message: "Unauthorized",
    });
  }
}

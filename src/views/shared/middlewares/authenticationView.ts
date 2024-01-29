import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IPayload } from "../../../modules/User/dto/userDto";

export default function ensureAuthenticatedViews(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authtoken = request.session.token;

  if (!authtoken) {
    return response.redirect("/dashboard/users/login");
  }

  try {
    const { sub } = verify(
      authtoken,
      process.env.secretOrPrivateKey
    ) as IPayload;

    request.user_id = sub;

    next();
  } catch (error) {
    return response.redirect("/dashboard/users/error");
  }
}

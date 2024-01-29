import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    // Se o erro for uma instância de AppError, retornamos uma resposta com o código de status e mensagem apropriados.
    return res.status(err.statusCode).json({ result: err.body });
  }

  // Se não for um erro AppError, consideramos um erro interno do servidor.
  const serverError = AppError.serverError("Internal Server Error");
  return res
    .status(serverError.statusCode)
    .json({ error: serverError.body, message: err });
}

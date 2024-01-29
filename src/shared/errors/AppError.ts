import { HttpStatusCode } from "../enum/errors";

export class AppError {
  constructor(public statusCode: number, public body: any) {}

  static badRequest(body: string) {
    return new AppError(HttpStatusCode.BAD_REQUEST, body);
  }

  static serverError(body = "Internal Server Error") {
    return new AppError(HttpStatusCode.SERVER_ERROR, body);
  }

  static ok<T>(body: T) {
    return new AppError(HttpStatusCode.OK, body);
  }

  static created<T>(body: T) {
    return new AppError(HttpStatusCode.CREATED, body);
  }

  static unauthorized<T>(body: T) {
    return new AppError(HttpStatusCode.UNAUTHORIZED, body);
  }
}

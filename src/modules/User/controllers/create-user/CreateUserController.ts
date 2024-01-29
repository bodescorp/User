import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserParams } from "../../dto/userDto";
import { Request, Response } from "express";
import validator from "validator";
import CreateUserService from "../../services/Create-User/CreateUserService";
import SendCodLoginUserService from "../../services/utils/SendCodLogin-User/SendCodLoginUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, firstName, lastName, password, admin }: ICreateUserParams =
      request.body;

    if (!firstName || !lastName || !email || !password) {
      throw AppError.badRequest("All fields are required");
    }

    if (!validator.isEmail(email)) {
      throw AppError.badRequest("Invalid email format");
    }
    const createUserService = new CreateUserService();

    const newUser = await createUserService.execute({
      email,
      firstName,
      lastName,
      password,
      admin,
    });

    const sendCodLoginUserService = new SendCodLoginUserService();

    await sendCodLoginUserService.execute(newUser.email_token);

    throw AppError.created(newUser);
  }
}

export { CreateUserController };

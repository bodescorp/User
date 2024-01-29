import { ICreateUserParams } from "../../../../../modules/User/dto/userDto";
import { Request, Response } from "express";
import validator from "validator";
import CreateUserService from "../../../../../modules/User/services/Create-User/CreateUserService";

export default class CreateUserViewController {
  async handle(request: Request, response: Response) {
    const { email, firstName, lastName, password }: ICreateUserParams =
      request.body;

    if (!firstName || !lastName || !email || !password) {
      return response.render("signup", {
        error: { statusCode: 400, body: "All fields are required!" },
      });
    }

    if (!validator.isEmail(email)) {
      return response.render("signup", {
        error: { statusCode: 400, body: "Invalid email format!" },
      });
    }

    const createUserService = new CreateUserService();
    try {
      const newUser = await createUserService.execute({
        email,
        firstName,
        lastName,
        password,
      });

      return response.redirect(`/dashboard/users/login`);
    } catch (error) {
      return response.render("signup", { error: error });
    }
  }
}

import { Request, Response } from "express";
import { AppError } from "../../../../shared/errors/AppError";
import { IUpdateUserParams } from "../../dto/userDto";
import validator from "validator";
import UpdateUserService from "../../services/Update-User/UpdateUserService";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const email = request.user_id;

    const params: IUpdateUserParams = request.body;

    // const { filename, originalname, mimetype, size } =
    //   request.file as Express.Multer.File;

    const imageProfile = request.file as Express.Multer.File;

    if (!email || !request.body) {
      throw AppError.badRequest("Missing fields!");
    }

    if (!validator.isEmail(email)) {
      throw AppError.badRequest("Invalid email format");
    }

    const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = [
      "password",
      "phone",
      "address",
      "city",
      "country",
      "phone",
      "state",
      "zipCode",
    ];

    const nonEmptyParams: IUpdateUserParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== "")
    );

    const someFieldIsNotAllowedToUpdate = Object.keys(nonEmptyParams!).some(
      (key) => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams)
    );

    if (someFieldIsNotAllowedToUpdate) {
      throw AppError.badRequest("Some received field is not allowed");
    }

    const updateUserService = new UpdateUserService();
    const userUpdated = await updateUserService.execute(
      email,
      nonEmptyParams,
      imageProfile
    );

    throw AppError.ok({
      mensagem: "Updated user ",
      body: userUpdated,
    });
  }
}

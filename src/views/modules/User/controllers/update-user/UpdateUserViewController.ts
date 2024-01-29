import { Request, Response } from "express";
import { IUpdateUserParams } from "../../../../../modules/User/dto/userDto";
import validator from "validator";
import UpdateUserService from "../../../../../modules/User/services/Update-User/UpdateUserService";

export class UpdateUserViewController {
  async handle(request: Request, response: Response) {
    const params: IUpdateUserParams = request.body;
    const email = request.user_id;
    const file = request.file as Express.Multer.File;

    if (!email || !request.body) {
      return response.render("account-settings", {
        error: { statusCode: 400, body: "Missing fields!" },
      });
    }
    const nonEmptyParams: IUpdateUserParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== "")
    );

    if (!validator.isEmail(email)) {
      return response.render("account-settings", {
        error: { statusCode: 400, body: "Invalid email format" },
      });
    }

    const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = [
      "password",
      "address",
      "city",
      "country",
      "phone",
      "state",
      "zipCode",
    ];

    const someFieldIsNotAllowedToUpdate = Object.keys(nonEmptyParams!).some(
      (key) => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams)
    );
    if (someFieldIsNotAllowedToUpdate) {
      return response.render("account-settings", {
        error: { statusCode: 400, body: "Some received field is not allowed" },
      });
    }

    const updateUserService = new UpdateUserService();
    try {
      const userUpdated = await updateUserService.execute(
        email,
        nonEmptyParams,
        file
      );
      return response.render("account-settings", {
        result: {
          statusCode: 200,
          message: "Updated user ",
          body: userUpdated,
        },
        user: userUpdated,
      });
    } catch (error) {
      // return response.render("account-settings", {
      //   error: error,
      // });

      return response.redirect(`/dashboard/users/account-settings`);
    }
  }
}

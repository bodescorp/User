import { Request, Response } from "express";
import { GetUserService } from "../../../../../modules/User/services/Get-User/GetUserService";

export class GetUserViewController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    if (!user_id) {
      return response.redirect("/dashboard/users/login");
    }
    const getUserService = new GetUserService();
    const allUsers = await getUserService.getUsers();

    return response.render("index", { allUsers });
  }
}

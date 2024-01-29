// import { User } from "../../interfaces/User";
// import { AppError } from "../../../../../shared/errors/AppError";
// import { DeleteUserService } from "../../services/Delete-User/DeleteUserService";
// import { Request, Response } from "express";

// export class DeleteUserController {
//   async handle(request: Request, response: Response): Promise<User> {
//     const ra = parseInt(request.params.ra);

//     if (!ra) {
//       throw AppError.badRequest("Missing RA User.");
//     }

//     const deleteUserService = new DeleteUserService();

//     const user = await deleteUserService.execute(ra);

//     throw AppError.ok({
//       message: "User Deleted",
//       body: `User deleted ${user}`,
//     });
//   }
// }

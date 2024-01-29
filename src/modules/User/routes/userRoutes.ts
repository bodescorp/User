import * as express from "express";

import { CreateUserController } from "../controllers/create-user/CreateUserController";
import { DeleteUserController } from "../controllers/delete-user/DeleteUserController";
import { GetUserController } from "../controllers/get-users/GetUserController";
import { UpdateUserController } from "../controllers/update-user/UpdateUserController";
import AuthenticateUserController from "../controllers/utils/authenticate-user/AuthenticateUserController";
import ensureAuthenticated from "../../../shared/middlewares/authentication";
import VerifyEmailUserController from "../controllers/utils/verifyEmail-user/VerifyEmailUserController";
import { ProfileUserController } from "../controllers/utils/profile-user/ProfileUserController";
import ensureVerifyEmail from "../../../shared/middlewares/ensureVerifyEmail";
import SendCodLoginUserController from "../controllers/utils/sendCodLogin-user/SendCodLoginUserController";
import { upload } from "../../../shared/providers/StorageProvider";

const userRoutes = express.Router();

const createUserController = new CreateUserController();
userRoutes.post("/new", createUserController.handle);

const deleteUserController = new DeleteUserController();
userRoutes.delete(
  "/remove",
  ensureAuthenticated,
  ensureVerifyEmail,
  deleteUserController.handle
);

const getUserController = new GetUserController();
userRoutes.get(
  "/get",
  ensureAuthenticated,
  ensureVerifyEmail,
  getUserController.handle
);

const updateUserController = new UpdateUserController();
userRoutes.patch(
  "/update",
  ensureAuthenticated,
  ensureVerifyEmail,
  upload.single("file"),
  updateUserController.handle
);

const profileUserController = new ProfileUserController();
userRoutes.get(
  "/profile",
  ensureAuthenticated,
  ensureVerifyEmail,
  profileUserController.handle
);

const authenticateUserController = new AuthenticateUserController();
userRoutes.post("/login", authenticateUserController.handle);

const verifyEmailUserController = new VerifyEmailUserController();
userRoutes.post("/verify-email", verifyEmailUserController.handle);

const sendCodLoginUserController = new SendCodLoginUserController();
userRoutes.patch("/send-codLogin", sendCodLoginUserController.handle);

export default userRoutes;

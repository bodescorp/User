import * as express from "express";

// import { CreateUserController } from "../controllers/create-user/CreateUserController";
// import { DeleteUserController } from "../controllers/delete-user/DeleteUserController";
// import { UpdateUserController } from "../controllers/update-user/UpdateUserController";
import { GetUserViewController } from "../controllers/get-users/GetUserViewController";
import { AuthenticateUserViewController } from "../controllers/utils/authenticate-user/AuthenticateUserViewController";
import { HandlebarsController } from "../controllers/handlebarsController";
import ensureAuthenticatedViews from "../../../shared/middlewares/authenticationView";
import CreateUserViewController from "../controllers/create-user/CreateUserViewController";
// import ensureVerifyEmailView from "../../../shared/middlewares/ensureVerifyEmailView";
import SendCodLoginUserViewController from "../controllers/utils/sendCodLogin-user/SendCodLoginUserViewController";
import VerifyEmailUserViewController from "../controllers/utils/verifyEmail-user/VerifyEmailViewController";
import { UpdateUserViewController } from "../controllers/update-user/UpdateUserViewController";
import { upload } from "../../../../shared/providers/StorageProvider";

const DashboardViewRoutes = express.Router();

const home = new HandlebarsController();

//Login
const authenticateUserController = new AuthenticateUserViewController();
DashboardViewRoutes.get("/login", home.home);
DashboardViewRoutes.post("/login", authenticateUserController.handle);

//signup
const createUserViewController = new CreateUserViewController();
DashboardViewRoutes.get("/signup", home.signUp);
DashboardViewRoutes.post("/signup", createUserViewController.handle);

//verify email
const verifyEmailUserViewController = new VerifyEmailUserViewController();
DashboardViewRoutes.get("/verifyEmail/:email_token", home.verifyEmail);
DashboardViewRoutes.post(
  "/verifyEmail/:email_token",
  verifyEmailUserViewController.handle
);
// send Cod Login
const sendCodLoginUserViewController = new SendCodLoginUserViewController();
DashboardViewRoutes.get(
  "/sendCodLogin/:email_token",
  sendCodLoginUserViewController.handle
);

//index
DashboardViewRoutes.get(
  "/",
  ensureAuthenticatedViews,
  // ensureVerifyEmailView,
  home.dashboard
);

//profile
DashboardViewRoutes.get("/profile", ensureAuthenticatedViews, home.profile);

//update user
const updateUserViewController = new UpdateUserViewController();

DashboardViewRoutes.get(
  "/account-settings",
  ensureAuthenticatedViews,
  home.accountSettings
);
DashboardViewRoutes.post(
  "/account-settings",
  ensureAuthenticatedViews,
  upload.single("file"),
  updateUserViewController.handle
);

//get users
const getUserViewController = new GetUserViewController();
DashboardViewRoutes.get(
  "/get",
  ensureAuthenticatedViews,
  getUserViewController.handle
);

// const createUserController = new CreateUserController();
// DashboardViewRoutes.post("/new", createUserController.handle);

// const deleteUserController = new DeleteUserController();
// DashboardViewRoutes.delete("/remove/:ra", deleteUserController.handle);

// const updateUserController = new UpdateUserController();
// DashboardViewRoutes.patch("/update/:ra", updateUserController.handle);
//index

export default DashboardViewRoutes;

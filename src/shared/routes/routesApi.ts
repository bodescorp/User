import { Router } from "express";
import userRoutes from "../../modules/User/routes/userRoutes";

const routerApi = Router();

routerApi.use("/users", userRoutes);

export default routerApi;

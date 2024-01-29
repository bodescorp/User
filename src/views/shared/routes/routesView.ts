import { Router } from "express";
import userViewRoutes from "../../modules/User/routes/userViewRoutes";

const routerView = Router();

routerView.use("/users", userViewRoutes);

export default routerView;

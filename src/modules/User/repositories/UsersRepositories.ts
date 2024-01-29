import { User } from "../models/User";
import { AppDataSource } from "../../../config/database/Mongoconnect";

export const usersRepository = AppDataSource.getRepository(User);

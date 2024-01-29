import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../modules/User/models/User";
import { config } from "dotenv";

//criar class

// export appDatasource. inicialize(index.js)

config();

const AppDataSource = new DataSource({
  type: "mongodb",
  database: "users-db",
  url: "mongodb+srv://root:123@cluster0.d5mewpn.mongodb.net/?retryWrites=true&w=majority",
  username: "root",
  password: "123",
  entities: [User],
  synchronize: true,
});

const MongoClient = {
  async connect() {
    AppDataSource.initialize()
      .then(() => {
        console.log("Connected to mongodb!");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export { AppDataSource, MongoClient };

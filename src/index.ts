import express from "express";
import { MongoClient } from "./config/database/Mongoconnect";
import { config } from "dotenv";
import cors from "cors";

import "reflect-metadata";
import "express-async-errors";

import * as path from "path";

import routerApi from "./shared/routes/routesApi";
import { errorHandler } from "./shared/middlewares/errorMiddleware";
import HandlebarsConfig from "./views/config/handlebars/handlebarsConfig";
import session from "express-session";
import routerView from "./views/shared/routes/routesView";

const main = async () => {
  config();
  const app = express();

  await MongoClient.connect();

  const views = new HandlebarsConfig();
  views.config(app);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname + "/views/", "assets")));
  app.use("/files", express.static(path.resolve("uploads")));

  app.use(
    session({
      secret: `${process.env.secretOrPrivateKey}`,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(cors());

  app.use(express.json());

  app.use("/api", routerApi);
  app.use("/dashboard", routerView);

  app.use(errorHandler);

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();

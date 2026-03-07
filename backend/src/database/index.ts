import { databaseConnection } from "../config/db";
import { Sequelize } from "sequelize";
import { allModel } from "./models";

interface databaseConfigInterface {
  database: string;
  username: string;
  password: string;
  port: number;
  dialect: string;
}
const config = databaseConnection() as unknown as databaseConfigInterface;
const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  port: Number(config.port),
  dialect: "postgres",
});



const models = allModel(sequelize);

Object.values(models).map((model) => {
  if (model.association) {
    model.association(model);
  }
});

export const Db = { sequelize, ...models };
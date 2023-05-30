import "express-async-errors";
import express, { json, Express } from "express";
import cors from "cors";
import routes from "./routes";
import { handleApplicationErrors } from "./middlewares/errorMiddleware";
import { connectDb, disconnectDB } from "./config/database";
import loadEnvs from "./config/envs";

loadEnvs();

const app = express();

app.use(json());
app.use(cors());
app.use(routes);
app.use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;

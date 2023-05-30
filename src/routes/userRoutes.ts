import { validateSchema } from "@/middlewares/schemaValidator";
import userControllers from "../controllers/userControllers";
import { Router } from "express";
import { authUserSchemma, createUserSchemma } from "@/schemas/User";

export const userRouter = Router();

userRouter.post(
  "/create",
  validateSchema(createUserSchemma),
  userControllers.create
);

userRouter.post(
  "/auth",
  validateSchema(authUserSchemma),
  userControllers.signin
);

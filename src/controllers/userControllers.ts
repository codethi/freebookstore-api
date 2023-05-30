import { NextFunction, Request, Response } from "express";
import userServices from "../service/userServices";
import { UserCreate } from "../interfaces/UserCreate";
import { UserAuth } from "../interfaces/UserAuth";

async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { name, email, password } = req.body as UserCreate;
  try {
    await userServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    return next(err);
  }
}

async function signin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { email, password } = req.body as UserAuth;

  try {
    const token = await userServices.signin(email, password);
    res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signin,
};

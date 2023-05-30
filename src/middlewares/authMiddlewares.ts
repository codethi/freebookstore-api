import jwt, { JwtPayload } from "jsonwebtoken";
import { unauthorizedError } from "../errors/index";
import userRepositories from "../repositories/userRepositories";
import { NextFunction, Request, Response } from "express";

interface ITokenPayload extends JwtPayload {
  id: number;
}

export const authValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers as Record<string, string>;
  if (!authorization) throw unauthorizedError();

  const parts = authorization.split(" ");
  if (parts.length !== 2) throw unauthorizedError();

  const [schema, token] = parts;
  if (schema !== "Bearer") throw unauthorizedError();

  jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
    try {
      if (error !== null) throw unauthorizedError();

      const { id } = decoded as ITokenPayload;
      const user = await userRepositories.findById(id);
      if (!user) throw unauthorizedError();

      res.locals.user = user;
      next();
    } catch (err) {
      next(err);
    }
  });
};

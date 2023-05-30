import { NextFunction, Request, Response } from "express";
import { conflictError } from "../errors/index";
import Joi from "joi";

interface JoiSchema {
  [key: string]: Joi.Schema;
}

export function validateSchema(schema: Joi.ObjectSchema<JoiSchema>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((detail) => detail.message).join(" ");
        throw conflictError(errors);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

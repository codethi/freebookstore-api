import joi from "joi";

export const createUserSchemma = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const authUserSchemma = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

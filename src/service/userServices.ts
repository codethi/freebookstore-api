import userRepositories from "../repositories/userRepositories";
import bcrypt from "bcrypt";
import { UserCreate } from "../interfaces/UserCreate";
import { invalidCredentialsError } from "../errors";
import jwt from "jsonwebtoken";

async function create({ name, email, password }: UserCreate): Promise<void> {
  const hashPassword: string = await bcrypt.hash(password, 10);
  await userRepositories.create({ name, email, password: hashPassword });
}

async function signin(email: string, password: string): Promise<string> {
  const user = await userRepositories.findByEmail(email);
  if (!user) throw invalidCredentialsError();

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) throw invalidCredentialsError();

  const secret = process.env.SECRET_JWT as string;

  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: 86400,
  });
  return token;
}

export default {
  create,
  signin,
};

import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database";
import { users } from "@prisma/client";
import * as jwt from "jsonwebtoken";

export async function createUser(): Promise<users> {
  return prisma.users.create({
    data: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  });
}

export async function createValidToken(user: users): Promise<string> {
  return jwt.sign({ id: user.id }, process.env.SECRET_JWT as string);
}

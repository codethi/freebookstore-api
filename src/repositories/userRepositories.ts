import { users } from "@prisma/client";
import { prisma } from "../config/database";

async function create({ name, email, password }): Promise<void> {
  await prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });
}

async function findById(id: number): Promise<users> {
  return await prisma.users.findUnique({ where: { id } });
}

async function findByEmail(email: string) {
  return await prisma.users.findUnique({ where: { email } });
}

export default {
  create,
  findById,
  findByEmail,
};

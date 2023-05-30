import { prisma } from "../../src/config/database";

export async function cleanDatabase() {
  await prisma.$executeRaw`TRUNCATE TABLE books RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE mybooks RESTART IDENTITY CASCADE;`;
}

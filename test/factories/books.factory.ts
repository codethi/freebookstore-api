import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database";
import { books, mybooks } from "@prisma/client";

export async function createBook(
  userId: number,
  availability?: boolean
): Promise<books> {
  return prisma.books.create({
    data: {
      name: faker.random.words(3),
      author: faker.name.fullName(),
      userId,
      available: availability === false ? false : true,
    },
  });
}

export async function takeBook(
  userId: number,
  bookId: number
): Promise<mybooks> {
  return prisma.mybooks.create({
    data: {
      userId,
      bookId,
    },
  });
}

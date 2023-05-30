import { BookCreate } from "../interfaces/BookCreate";
import { prisma } from "../config/database";
import { books, mybooks, users } from "@prisma/client";

async function create({
  name,
  author,
  userId,
  available,
}: BookCreate): Promise<void> {
  await prisma.books.create({
    data: {
      name,
      author,
      userId,
      available,
    },
  });
}

async function findAll(): Promise<books[]> {
  return await prisma.books.findMany();
}

async function findByName(name: string): Promise<books> {
  return await prisma.books.findUnique({ where: { name } });
}

async function findById(id: number): Promise<books> {
  return await prisma.books.findUnique({ where: { id } });
}

async function takeBook(userId: number, bookId: number): Promise<void> {
  await prisma.books.update({
    where: { id: bookId },
    data: { available: false },
  });

  await prisma.mybooks.create({
    data: {
      userId,
      bookId,
    },
  });
}

async function findAllMyBooks(userId: number): Promise<
  (mybooks & {
    users: users;
    books: books;
  })[]
> {
  return await prisma.mybooks.findMany({
    where: { userId },
    include: {
      users: true,
      books: true,
    },
  });
}

export default {
  create,
  findAll,
  findByName,
  takeBook,
  findAllMyBooks,
  findById,
};

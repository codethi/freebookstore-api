import supertest from "supertest";
import app, { init } from "../../src/app";
import { disconnectDB } from "../../src/config/database";
import { createUser, createValidToken } from "../factories/user.factory";
import { faker } from "@faker-js/faker";
import { createBook, takeBook } from "../factories/books.factory";
import { cleanDatabase } from "../utils/helpers";

const appForTest = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  disconnectDB();
});

describe("POST /books", () => {
  it("should return status 201 when body is valid and book is not already registered", async () => {
    const user = await createUser();
    const token = await createValidToken(user);

    const result = await appForTest
      .post("/books")
      .send({
        name: faker.random.words(3),
        author: faker.name.fullName(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(result.status).toBe(201);
  });

  it("should return status 409 when book is already registered", async () => {
    const user = await createUser();
    const token = await createValidToken(user);
    const book = await createBook(user.id);

    const result = await appForTest
      .post("/books")
      .send({
        name: book.name,
        author: book.author,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(result.status).toBe(409);
    expect(result.body.message).toBe("Book already exists");
  });
});

describe("GET /books", () => {
  it("should return status 200 when books are found", async () => {
    const user = await createUser();
    const token = await createValidToken(user);
    const book = await createBook(user.id);

    const result = await appForTest.get("/books").set({
      Authorization: `Bearer ${token}`,
    });

    expect(result.status).toBe(200);
    expect(result.body[0].name).toBe(book.name);
    expect(result.body[0].author).toBe(book.author);
  });

  it("should return status 404 when books are not found", async () => {
    const user = await createUser();
    const token = await createValidToken(user);

    const result = await appForTest.get("/books").set({
      Authorization: `Bearer ${token}`,
    });

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("No result for this search!");
  });
});

describe("POST /books/take-book/:id", () => {
  it("should return status 200 when book is found and user is able to take it", async () => {
    const user = await createUser();
    const token = await createValidToken(user);
    const book = await createBook(user.id);

    const result = await appForTest
      .post(`/books/take-book/${book.id}`)
      .send({
        name: book.name,
        author: book.author,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(result.status).toBe(201);
  });

  it("should return status 404 when book is not found", async () => {
    const user = await createUser();
    const token = await createValidToken(user);

    const result = await appForTest
      .post(`/books/take-book/0`)
      .send({
        name: faker.random.words(3),
        author: faker.name.fullName(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(result.status).toBe(404);
  });

  it("should return status 409 when book is already taken", async () => {
    const user = await createUser();
    const token = await createValidToken(user);
    const unavailableBook = await createBook(user.id, false);

    const result = await appForTest
      .post(`/books/take-book/${unavailableBook.id}`)
      .send({
        name: unavailableBook.name,
        author: unavailableBook.author,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(result.status).toBe(409);
  });
});

describe("GET /books/my-books", () => {
  it("should return status 200 when books are found", async () => {
    const user = await createUser();
    const token = await createValidToken(user);
    const book = await createBook(user.id);
    await takeBook(user.id, book.id);

    const result = await appForTest.get("/books/my-books").set({
      Authorization: `Bearer ${token}`,
    });

    expect(result.status).toBe(200);
  });

  it("should return status 404 when books are not found", async () => {
    const user = await createUser();
    const token = await createValidToken(user);

    const result = await appForTest.get("/books/my-books").set({
      Authorization: `Bearer ${token}`,
    });

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("No result for this search!");
  });
});

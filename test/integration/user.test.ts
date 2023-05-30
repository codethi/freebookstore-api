import supertest from "supertest";

import app, { init } from "../../src/app";
import { cleanDatabase } from "../utils/helpers";

const appForTest = supertest(app);

beforeAll(async () => {
  await init();
  await cleanDatabase();
});

describe("POST /users/create", () => {
  test("Should ensure UserController.create return status code 409 on invalid email", async () => {
    const result = await appForTest.post("/users/create").send({
      name: "Ruan",
      email: "",
      password: "senha",
    });

    expect(result.statusCode).toBe(409);
  });

  test("Should ensure UserController.create return status code 409 on body without name", async () => {
    const result = await appForTest.post("/users/create").send({
      email: "ruan@email.com",
      password: "senha",
    });

    expect(result.statusCode).toBe(409);
  });

  test("Should ensure UserController.create return status code 409 on body without email", async () => {
    const result = await appForTest.post("/users/create").send({
      name: "Ruan",
      password: "senha",
    });

    expect(result.statusCode).toBe(409);
  });

  test("Should ensure UserController.create return status code 409 on body without password", async () => {
    const result = await appForTest.post("/users/create").send({
      name: "Ruan",
      email: "ruan2@email.com",
    });

    expect(result.statusCode).toBe(409);
  });

  test("Should ensure UserController.create return status code 201", async () => {
    const result = await appForTest.post("/users/create").send({
      name: "Ruan",
      email: "ruan@email.com",
      password: "senha",
    });

    expect(result.statusCode).toBe(201);
  });
});

describe("POST /users/auth", () => {
  test("Should ensure UserController.signin return status code 401", async () => {
    const result = await appForTest.post("/users/auth").send({
      email: "ruan2@email.com",
      password: "senha",
    });

    expect(result.statusCode).toBe(401);
  });

  test("Should ensure UserController.signin return status code 401", async () => {
    const result = await appForTest.post("/users/auth").send({
      email: "ruan@email.com",
      password: "senha errada",
    });

    expect(result.statusCode).toBe(401);
  });

  test("Should ensure UserController.signin return status code 200", async () => {
    const result = await appForTest.post("/users/auth").send({
      email: "ruan@email.com",
      password: "senha",
    });

    expect(result.statusCode).toBe(200);
  });
});

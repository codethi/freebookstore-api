import { Router } from "express";
import bookControllers from "../controllers/bookControllers";
import { authValidation } from "../middlewares/authMiddlewares";
import { validateSchema } from "../middlewares/schemaValidator";
import { bookSchemma } from "../schemas/Book";

const bookRouter = Router();

bookRouter.post(
  "/",
  authValidation,
  validateSchema(bookSchemma),
  bookControllers.create
);

bookRouter.get("/", authValidation, bookControllers.findAll);

bookRouter.post(
  "/take-book/:id",
  validateSchema(bookSchemma),
  authValidation,
  bookControllers.takeBook
);

bookRouter.get("/my-books", authValidation, bookControllers.findAllMyBooks);

export default bookRouter;

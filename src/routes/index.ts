import { Router } from "express";
import { userRouter } from "./userRoutes";
import bookRouter from "./bookRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/books", bookRouter);

export default router;

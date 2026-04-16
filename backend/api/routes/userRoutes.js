import express from "express";
import { createUser, userLogin, userPoints } from "../controllers/userControllers.js";
import { loginMiddleware } from "../../middleware/loginProtectedRoute.js";

const userRouter = express.Router();

//create a user
userRouter.post("/", createUser);
userRouter.post("/login", userLogin);
userRouter.get("/points", loginMiddleware, userPoints);

export { userRouter };

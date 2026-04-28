import express from "express";
import { createUser, userLogin, userPoints, userLogout, checkAuthStatus } from "../controllers/userControllers.js";
import { loginMiddleware } from "../../middleware/loginProtectedRoute.js";

const userRouter = express.Router();

//create a user
userRouter.post("/", createUser);
userRouter.post("/login", userLogin);
userRouter.get("/auth-status", checkAuthStatus);
userRouter.get("/points", loginMiddleware, userPoints);
userRouter.post("/logout", userLogout);

export { userRouter };

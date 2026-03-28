import express from "express";
import { createUser, userLogin } from "../controllers/userControllers.js";
import { loginMiddleware } from "../../middleware/loginProtectedRoute.js";

const userRouter = express.Router();

//create a user
userRouter.post("/", createUser);
userRouter.post("/login", userLogin);

//testing if mounting protected route works or not
userRouter.post("/testing", loginMiddleware, (_, res) => {
  res.send("CHecking Middleware works or not");
});

export { userRouter };

import express from "express";
import { createUser, userLogin } from "../controllers/userControllers.js";

const userRouter = express.Router();

//create a user

userRouter.post("/", createUser);
userRouter.post("/login", userLogin)

export { userRouter };

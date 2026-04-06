import express from "express";
import { validateInvite, joinHousehold } from "../controllers/membershipControllers.js";
import { loginMiddleware } from "../../middleware/loginProtectedRoute.js";

const membershipRouter = express.Router();

// Join household with invite code
membershipRouter.post("/join", loginMiddleware, validateInvite, joinHousehold);

export { membershipRouter };
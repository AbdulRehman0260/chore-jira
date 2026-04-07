import express from "express";
import { validateInvite, joinHousehold } from "../controllers/membershipControllers.js";
import { loginMiddleware } from "../../middleware/loginProtectedRoute.js";

const membershipRouter = express.Router();

// Apply login middleware to all routes in this router
membershipRouter.use(loginMiddleware);

// Join household with invite code
membershipRouter.post("/join", validateInvite, joinHousehold);

export { membershipRouter };
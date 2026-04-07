import express from "express";
import { createHousehold } from "../controllers/householdControllers.js";
import { loginMiddleware } from "../../middleware/loginProtectedRoute.js";

const householdRouter = express.Router();

// Apply login middleware to all routes in this router
householdRouter.use(loginMiddleware);

//creating a household
householdRouter.post("/", createHousehold)

export { householdRouter };

import express from "express";
import { createHousehold } from "../controllers/householdControllers.js";

const householdRouter = express.Router();

//post a ticket
householdRouter.post("/", createHousehold);

export { householdRouter };

import express from "express";
import { createHousehold } from "../controllers/householdControllers.js";

const householdRouter = express.Router();

//creating a household
householdRouter.post("/", createHousehold)

export { householdRouter };

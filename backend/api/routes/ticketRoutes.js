import express from "express";
import {
    getUserHouseholds,
    getHouseholdUsers,
    getTickets
} from "../controllers/ticketControllers.js";
import { loginMiddleware } from "../../middleware/loginProtectedRoute.js";

const ticketRouter = express.Router();

ticketRouter.use(loginMiddleware);

// Get households for current user (for dropdown)
ticketRouter.get("/households", getUserHouseholds);

// Get users in a specific household (for assignee dropdown)
ticketRouter.get("/household/:householdId/users", getHouseholdUsers);

// Create a new ticket
// ticketRouter.post("/", createTicket);

// Get tickets (placeholder)
ticketRouter.get("/", getTickets);

export { ticketRouter };

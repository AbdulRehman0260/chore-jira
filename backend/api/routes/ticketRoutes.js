import express from "express";
import {
    getUserHouseholds,
    getHouseholdUsers,
    getTicketsByUserId,
    getTicketsByUserIdDash,
    getTicketsByHouseholdId,
    createTicket,
    updateTicket
} from "../controllers/ticketControllers.js";
import { loginMiddleware } from "../../middleware/loginProtectedRoute.js";

const ticketRouter = express.Router();

ticketRouter.use(loginMiddleware);

// Get households for current user (for dropdown)
ticketRouter.get("/households", getUserHouseholds);

// Get users in a specific household (for assignee dropdown)
ticketRouter.get("/household/:householdId/users", getHouseholdUsers);

// Create a new ticket
ticketRouter.post("/", createTicket);

// Get tickets (by logged in userId)
ticketRouter.get("/", getTicketsByUserId);
ticketRouter.get("/user", getTicketsByUserIdDash);


// Get tickets by householdId
ticketRouter.get("/household/:householdId", getTicketsByHouseholdId);

//updating a ticket
ticketRouter.patch("/:ticketId", updateTicket);


export { ticketRouter };

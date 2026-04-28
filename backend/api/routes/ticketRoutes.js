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

//Get all households for the current user
ticketRouter.get("/households", loginMiddleware, getUserHouseholds);

//Get all users in a specific household
ticketRouter.get("/household/:householdId/users", loginMiddleware, getHouseholdUsers);

//Create a ticket
ticketRouter.post("/", loginMiddleware, createTicket);

//Get all tickets for a user
ticketRouter.get("/", getTicketsByUserId);
ticketRouter.get("/user", loginMiddleware, getTicketsByUserIdDash);

//Get all tickets for a household
ticketRouter.get("/household/:householdId", loginMiddleware, getTicketsByHouseholdId);

//updating a ticket
ticketRouter.patch("/:ticketId", updateTicket);


export { ticketRouter };

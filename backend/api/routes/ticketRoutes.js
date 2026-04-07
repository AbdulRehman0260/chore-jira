import express from "express";
import { getTickets } from "../controllers/ticketControllers.js";
import { loginMiddleware } from "../../middleware/loginProtectedRoute.js";

const ticketRouter = express.Router();

ticketRouter.use(loginMiddleware);

//post a ticket

ticketRouter.get("/", getTickets);

export { ticketRouter };

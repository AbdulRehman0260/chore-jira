import express from "express";
import { getTickets } from "../controllers/ticketControllers.js";

const ticketRouter = express.Router();

//post a ticket

ticketRouter.get("/", getTickets);

export { ticketRouter };

import express from "express";
import dotenv from "dotenv";
import { ticketRouter } from "./api/routes/ticketRoutes.js";
dotenv.config();

//app instance created
const app = express();

app.use(express.json());
app.use("/api/tickets", ticketRouter);
const port = process.env.PORT || 3000;

//App is listening
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

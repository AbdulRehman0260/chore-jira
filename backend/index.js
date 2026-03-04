import express from "express";
import dotenv from "dotenv";
import { ticketRouter } from "./api/routes/ticketRoutes.js";
import { householdRouter } from "./api/routes/householdRoutes.js";
import { connectDB } from "./db/config.js";
dotenv.config();

//mongodb access / database created
connectDB();

//app instance created
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tickets", ticketRouter);
app.use("/api/households", householdRouter);

//App is listening
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

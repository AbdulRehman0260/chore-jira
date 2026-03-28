import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ticketRouter } from "./api/routes/ticketRoutes.js";
import { householdRouter } from "./api/routes/householdRoutes.js";
import { connectDB } from "./db/config.js";
import { userRouter } from "./api/routes/userRoutes.js";
import { loginMiddleware } from "./middleware/loginProtectedRoute.js";
dotenv.config();

//mongodb access / database created
connectDB();

//app instance created
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(loginMiddleware);
app.use("/api/tickets", ticketRouter);
app.use("/api/customers", userRouter);
app.use("/api/households", householdRouter);

//App is listening
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { ticketRouter } from "./api/routes/ticketRoutes.js";
import { householdRouter } from "./api/routes/householdRoutes.js";
import { membershipRouter } from "./api/routes/membershipRoutes.js";
import { connectDB } from "./db/config.js";
import { userRouter } from "./api/routes/userRoutes.js";
import { loginMiddleware } from "./middleware/loginProtectedRoute.js";
import cors from "cors"
dotenv.config();

//mongodb access / database created
connectDB();

//app instance created
const app = express();

// Simple CORS configuration
app.use(cors({
  origin: true, // Allow all origins during development
  credentials: true
}));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Public routes (no auth required)
app.use("/api/customers", userRouter);

// Protected routes (auth required)
app.use("/api/tickets", ticketRouter);
app.use("/api/households", householdRouter);
app.use("/api/memberships", membershipRouter);

// Serve static frontend files
app.use(express.static("/app/frontend/dist"));

// Serve React app for any non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile("/app/frontend/dist/index.html");
});

//App is listening
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import { userRoutes } from "./routes/userRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

connectDatabase();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to video sharing platfrom");
});

app.use("/api/v1/user", userRoutes);

app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log("Listening on port 4000");
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import { userRoutes } from "./routes/userRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import { videoRoutes } from "./routes/videoRoutes.js";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

const app = express();
dotenv.config();

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

connectDatabase();

const corsOption = {
  credentials: true,
  origin: [process.env.FRONT_END_URL],
};
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.get("/", (req, res) => {
  res.send("Welcome to video sharing platfrom");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/videos", videoRoutes);

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

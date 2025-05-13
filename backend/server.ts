import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";

import mongoose from "mongoose";
import connectDB from "./config/dbConfig";
connectDB();

import errorHandler from "./middleware/errorHandler";

import userRouter from "./routes/userRoutes";
import scanRouter from "./routes/scanRoutes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from the backend of LeafyLens!");
});

app.use("/api/users", userRouter);
app.use("/api/scans", scanRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((_req, res, _next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

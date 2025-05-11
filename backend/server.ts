import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";

import mongoose from "mongoose";
import connectDB from "./config/dbConfig";
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from the backend of LeafyLens!");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

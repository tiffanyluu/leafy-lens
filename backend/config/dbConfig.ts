import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.once("open", () => {
      if (mongoose.connection.db) {
        console.log("Connected to MongoDB (LeafyLens DB)");
        console.log("Using database:", mongoose.connection.db.databaseName);
      } else {
        console.error("MongoDB connection db is not available.");
      }
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    process.exit(1);
  }
};

export default connectDB;

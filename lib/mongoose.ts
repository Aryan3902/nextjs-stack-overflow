import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  // Prevent unknown field queries
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI)
    return console.error("MONGODB_URI is not defined");

  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "devflow",
    });

    isConnected = true;
    console.log("Database connected");
  } catch (error) {
    console.error("Database Connection failed", error);
  }
};

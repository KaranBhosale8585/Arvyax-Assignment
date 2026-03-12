import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set");
}

export async function getDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database");

    return mongoose.connection;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database");
  }
}

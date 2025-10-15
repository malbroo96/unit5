import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/oneToOneDemo");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
};

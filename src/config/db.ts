import mongoose from "mongoose";
import { env } from "./env";
import logger from "./logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI as string);
    logger.info("✅ MongoDB connected successfully");
  } catch (error) {
    if (error instanceof Error) {
      logger.fatal({
        msg: "❌ MongoDB connection failed",
        error: error,
      });
      process.exit(1);
    }
  }
};
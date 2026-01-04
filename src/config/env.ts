import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  MONGODB_URI: str({ desc: "MongoDB connection string" }),
  API_SECRET: str({ desc: "API secret key" }),
  LOG_LEVEL: str({ default: "info", desc: "Logging level" }),
  NODE_ENV: str({ default: "development", desc: "Node environment" }),
})
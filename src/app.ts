import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middleware/error.middleware";
import { pinoHttp } from "pino-http";
import logger from "./config/logger";

import budgetRoutes from "./routes/budget.routes";
import categoryRoutes from "./routes/category.routes";
import expensesRoutes from "./routes/expense.routes";
import metaRoutes from "./routes/meta.routes";
import { apiLimiter } from "./config/ratelimiter";

const app = express();

app.use(cors({
  origin: "*",
  allowedHeaders: ["Authorization", "Content-Type"]
}));
app.use(pinoHttp({ logger }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalErrorHandler);
app.use("/", apiLimiter);

app.set("trust proxy", 1);

app.use("/budgets", budgetRoutes);
app.use("/categories", categoryRoutes);
app.use("/expenses", expensesRoutes);
app.use("/meta", metaRoutes);

export default app;
import { Response, Request, NextFunction } from "express";
import logger from "../config/logger";

interface Error {
  status?: number;
  message?: string;
  stack?: string;
}

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({
    msg: err.message,
    status: err.status,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  })
}
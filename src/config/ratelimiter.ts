import rateLimit from "express-rate-limit";
import logger from "./logger";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
  handler: (req, res, next, options) => {
    logger.warn(`⚠️ Rate limit exceeded for IP: ${req.ip} on path: ${req.path}`);
    res.status(options.statusCode).json(options.message);
  },
});
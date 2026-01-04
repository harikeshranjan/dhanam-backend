"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const globalErrorHandler = (err, req, res, next) => {
    logger_1.default.error({
        msg: err.message,
        status: err.status,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
exports.globalErrorHandler = globalErrorHandler;

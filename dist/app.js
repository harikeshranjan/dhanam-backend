"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middleware/error.middleware");
const pino_http_1 = require("pino-http");
const logger_1 = __importDefault(require("./config/logger"));
const budget_routes_1 = __importDefault(require("./routes/budget.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const expense_routes_1 = __importDefault(require("./routes/expense.routes"));
const meta_routes_1 = __importDefault(require("./routes/meta.routes"));
const ratelimiter_1 = require("./config/ratelimiter");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    allowedHeaders: ["Authorization", "Content-Type"]
}));
app.use((0, pino_http_1.pinoHttp)({ logger: logger_1.default }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(error_middleware_1.globalErrorHandler);
app.use("/", ratelimiter_1.apiLimiter);
app.set("trust proxy", 1);
app.use("/budgets", budget_routes_1.default);
app.use("/categories", category_routes_1.default);
app.use("/expenses", expense_routes_1.default);
app.use("/meta", meta_routes_1.default);
exports.default = app;

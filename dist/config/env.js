"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const envalid_1 = require("envalid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)({ default: 5000 }),
    MONGODB_URI: (0, envalid_1.str)({ desc: "MongoDB connection string" }),
    API_SECRET: (0, envalid_1.str)({ desc: "API secret key" }),
    LOG_LEVEL: (0, envalid_1.str)({ default: "info", desc: "Logging level" }),
    NODE_ENV: (0, envalid_1.str)({ default: "development", desc: "Node environment" }),
});

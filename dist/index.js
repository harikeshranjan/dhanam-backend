"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
(0, db_1.connectDB)();
app_1.default.get("/", (req, res) => {
    res.send("Dhanam Backend is running");
});
// app.listen(env.PORT, () => {
//   console.log(`Server running on port: ${env.PORT}`);
// });
exports.default = app_1.default;

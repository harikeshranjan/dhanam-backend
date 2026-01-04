"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const env_1 = require("../config/env");
function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = header.replace("Bearer ", "");
    if (token !== env_1.env.API_SECRET) {
        return res.status(401).json({ error: "Invalid Token" });
    }
    next();
}

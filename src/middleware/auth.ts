import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = header.replace("Bearer ", "");

  if (token !== env.API_SECRET) {
    return res.status(401).json({ error: "Invalid Token" });
  }

  next();
}
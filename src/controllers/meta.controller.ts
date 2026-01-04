import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { syncService } from "../services/sync.service";

export const MetaController = {
  health: async (req: Request, res: Response) => {
    const dbStatus = mongoose.connection.readyState;
    const statusMap = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    res.json({
      status: "ok",
      database: statusMap[dbStatus as keyof typeof statusMap],
      uptime: Math.floor(process.uptime()) + "s",
      timestamp: new Date().toISOString(),
    });
  },

  sync: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { since } = req.query
      const data = await syncService.getAggregatedData(since as string)
      return res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  syncStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [lastExp, lastCat] = await Promise.all([
        mongoose.connection.db?.collection('expenses').find().sort({ updatedAt: -1 }).limit(1).toArray(),
        mongoose.connection.db?.collection('categories').find().sort({ updatedAt: -1 }).limit(1).toArray(),
      ])

      const latestUpdate = Math.max(
        lastExp?.[0]?.updatedAt?.getTime() ?? 0,
        lastCat?.[0]?.updatedAt?.getTime() ?? 0
      );

      res.status(200).json({
        success: true,
        lastModified: new Date(latestUpdate).toISOString(),
        hasData: (lastExp?.length ?? 0) > 0 || (lastCat?.length ?? 0) > 0,
      })
    } catch (error) {
      next(error);
    }
  }
}
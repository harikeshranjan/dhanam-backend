"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sync_service_1 = require("../services/sync.service");
exports.MetaController = {
    health: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const dbStatus = mongoose_1.default.connection.readyState;
        const statusMap = {
            0: "disconnected",
            1: "connected",
            2: "connecting",
            3: "disconnecting",
        };
        res.json({
            status: "ok",
            database: statusMap[dbStatus],
            uptime: Math.floor(process.uptime()) + "s",
            timestamp: new Date().toISOString(),
        });
    }),
    sync: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { since } = req.query;
            const data = yield sync_service_1.syncService.getAggregatedData(since);
            return res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }),
    syncStatus: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        try {
            const [lastExp, lastCat] = yield Promise.all([
                (_a = mongoose_1.default.connection.db) === null || _a === void 0 ? void 0 : _a.collection('expenses').find().sort({ updatedAt: -1 }).limit(1).toArray(),
                (_b = mongoose_1.default.connection.db) === null || _b === void 0 ? void 0 : _b.collection('categories').find().sort({ updatedAt: -1 }).limit(1).toArray(),
            ]);
            const latestUpdate = Math.max((_e = (_d = (_c = lastExp === null || lastExp === void 0 ? void 0 : lastExp[0]) === null || _c === void 0 ? void 0 : _c.updatedAt) === null || _d === void 0 ? void 0 : _d.getTime()) !== null && _e !== void 0 ? _e : 0, (_h = (_g = (_f = lastCat === null || lastCat === void 0 ? void 0 : lastCat[0]) === null || _f === void 0 ? void 0 : _f.updatedAt) === null || _g === void 0 ? void 0 : _g.getTime()) !== null && _h !== void 0 ? _h : 0);
            res.status(200).json({
                success: true,
                lastModified: new Date(latestUpdate).toISOString(),
                hasData: ((_j = lastExp === null || lastExp === void 0 ? void 0 : lastExp.length) !== null && _j !== void 0 ? _j : 0) > 0 || ((_k = lastCat === null || lastCat === void 0 ? void 0 : lastCat.length) !== null && _k !== void 0 ? _k : 0) > 0,
            });
        }
        catch (error) {
            next(error);
        }
    })
};

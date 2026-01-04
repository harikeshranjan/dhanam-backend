"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBudgetSchema = exports.Budget = exports.BudgetSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.BudgetSchema = zod_1.z.object({
    month: zod_1.z.number().min(1).max(12, "Month must be between 1 and 12"),
    year: zod_1.z.number().min(2000, "Year must be 2000 or later"),
    totalAmount: zod_1.z.number().min(0, "Total amount must be non-negative"),
});
const budgetMongooseSchema = new mongoose_1.Schema({
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
}, { timestamps: true });
budgetMongooseSchema.index({ month: 1, year: 1 }, { unique: true });
exports.Budget = mongoose_1.models.Budget || (0, mongoose_1.model)("Budget", budgetMongooseSchema);
exports.UpdateBudgetSchema = exports.BudgetSchema.partial();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = exports.ExpenseSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.ExpenseSchema = zod_1.z.object({
    amount: zod_1.z.number().positive("Amount must be greater than 0"),
    description: zod_1.z.string().optional(),
    date: zod_1.z.coerce.date()
});
const expenseMongooseSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Category' },
    budgetId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Budget' },
}, { timestamps: true });
exports.Expense = mongoose_1.models.Expense || (0, mongoose_1.model)('Expense', expenseMongooseSchema);

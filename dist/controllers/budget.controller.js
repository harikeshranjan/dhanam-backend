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
exports.deleteBudget = exports.updateBudget = exports.getBudgetById = exports.getCurrentMonthBudget = exports.getBudgets = exports.createBudget = void 0;
const budget_1 = require("../models/budget");
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
// MARK: Create Budget
const createBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedBudget = budget_1.BudgetSchema.parse(req.body);
        const newBudget = new budget_1.Budget(validatedBudget);
        yield newBudget.save();
        res.status(201).json({ success: true, data: newBudget });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.message
            });
        }
        next(error);
    }
});
exports.createBudget = createBudget;
// MARK: Get Budgets
const getBudgets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const budgets = yield budget_1.Budget.find().sort({ year: -1, month: -1 });
        res.status(200).json({ success: true, data: budgets });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.issues
            });
        }
        next(error);
    }
});
exports.getBudgets = getBudgets;
// MARK: Get Current Month Budget
const getCurrentMonthBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        const budget = yield budget_1.Budget.findOne({ month, year });
        if (!budget) {
            return res.status(404).json({ message: "No budget found for the current month" });
        }
        res.status(200).json({ success: true, data: budget });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.issues
            });
        }
        next(error);
    }
});
exports.getCurrentMonthBudget = getCurrentMonthBudget;
// MARK: Get Budget by ID
const getBudgetById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid budget ID" });
        }
        const budget = yield budget_1.Budget.findById(id);
        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        res.status(200).json({ success: true, data: budget });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.issues
            });
        }
        next(error);
    }
});
exports.getBudgetById = getBudgetById;
// MARK: Update Budget
const updateBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid budget ID" });
        }
        const validatedBudget = budget_1.UpdateBudgetSchema.parse(req.body);
        const updatedBudget = yield budget_1.Budget.findByIdAndUpdate(id, validatedBudget, { new: true });
        if (!updatedBudget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        res.status(200).json({ success: true, data: updatedBudget });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.issues
            });
        }
        next(error);
    }
});
exports.updateBudget = updateBudget;
// MARK: Delete Budget
const deleteBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid budget ID" });
        }
        const deletedBudget = yield budget_1.Budget.findByIdAndDelete(id);
        if (!deletedBudget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        res.status(200).json({ success: true, message: "Budget deleted successfully" });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.issues
            });
        }
        next(error);
    }
});
exports.deleteBudget = deleteBudget;

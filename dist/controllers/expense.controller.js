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
exports.deleteExpense = exports.updateExpense = exports.getExpensesByBudget = exports.getExpenseById = exports.getExpenses = exports.createExpense = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const expenses_1 = require("../models/expenses");
const categories_1 = require("../models/categories");
const budget_1 = require("../models/budget");
// MARK: Create Expense
const createExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, budgetId } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(categoryId) ||
            !mongoose_1.default.Types.ObjectId.isValid(budgetId)) {
            return res.status(400).json({ message: "Invalid categoryId or budgetId" });
        }
        const validatedData = expenses_1.ExpenseSchema.parse(req.body);
        // Ensure category exists
        const categoryExists = yield categories_1.Category.exists({ _id: categoryId });
        if (!categoryExists) {
            return res.status(404).json({ message: "Category not found" });
        }
        // Ensure budget exists
        const budgetExists = yield budget_1.Budget.exists({ _id: budgetId });
        if (!budgetExists) {
            return res.status(404).json({ message: "Budget not found" });
        }
        const expense = yield expenses_1.Expense.create(Object.assign(Object.assign({}, validatedData), { categoryId,
            budgetId }));
        res.status(201).json({
            success: true,
            data: expense,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.message,
            });
        }
        next(error);
    }
});
exports.createExpense = createExpense;
// MARK: Get All Expenses
const getExpenses = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield expenses_1.Expense.find()
            .populate("categoryId", "name color")
            .populate("budgetId", "month year")
            .sort({ date: -1 })
            .lean();
        res.status(200).json({
            success: true,
            data: expenses,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getExpenses = getExpenses;
// MARK: Get Expense by ID
const getExpenseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid expense ID" });
        }
        const expense = yield expenses_1.Expense.findById(id)
            .populate("categoryId", "name color")
            .populate("budgetId", "month year")
            .lean();
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({
            success: true,
            data: expense,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getExpenseById = getExpenseById;
// MARK: Get Expenses by Budget
const getExpensesByBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { budgetId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(budgetId)) {
            return res.status(400).json({ message: "Invalid budget ID" });
        }
        const expenses = yield expenses_1.Expense.find({ budgetId })
            .populate("categoryId", "name color")
            .sort({ date: -1 })
            .lean();
        res.status(200).json({
            success: true,
            data: expenses,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getExpensesByBudget = getExpensesByBudget;
// MARK: Update Expense
const updateExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid expense ID" });
        }
        const UpdateExpenseSchema = expenses_1.ExpenseSchema.partial();
        const validatedData = UpdateExpenseSchema.parse(req.body);
        const updatedExpense = yield expenses_1.Expense.findByIdAndUpdate(id, validatedData, { new: true, runValidators: true });
        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({
            success: true,
            data: updatedExpense,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.message,
            });
        }
        next(error);
    }
});
exports.updateExpense = updateExpense;
// MARK: Delete Expense
const deleteExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid expense ID" });
        }
        const deletedExpense = yield expenses_1.Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteExpense = deleteExpense;

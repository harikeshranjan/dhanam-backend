"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expense_controller_1 = require("../controllers/expense.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.auth);
router.post("/", expense_controller_1.createExpense); // MARK: Create Expense
router.get("/", expense_controller_1.getExpenses); // MARK: Get All Expenses
router.get("/budget/:budgetId", expense_controller_1.getExpensesByBudget); // MARK: Get Expenses by Budget
router.get("/:id", expense_controller_1.getExpenseById); // MARK: Get Expense by ID
router.put("/:id", expense_controller_1.updateExpense); // MARK: Update Expense
router.delete("/:id", expense_controller_1.deleteExpense); // MARK: Delete Expense
exports.default = router;

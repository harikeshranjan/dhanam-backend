import { Router } from "express";
import {
  createExpense,
  getExpenses,
  getExpenseById,
  getExpensesByBudget,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.use(auth);

router.post("/", createExpense); // MARK: Create Expense
router.get("/", getExpenses); // MARK: Get All Expenses
router.get("/budget/:budgetId", getExpensesByBudget); // MARK: Get Expenses by Budget
router.get("/:id", getExpenseById); // MARK: Get Expense by ID
router.put("/:id", updateExpense);  // MARK: Update Expense
router.delete("/:id", deleteExpense); // MARK: Delete Expense

export default router;

import { Router } from "express";
import {
  createBudget,
  getBudgets,
  getCurrentMonthBudget,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from "../controllers/budget.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.use(auth);

router.post("/", createBudget); // MARK: Create Budget
router.get("/", getBudgets); // MARK: Get All Budgets
router.get("/current", getCurrentMonthBudget); // MARK: Get Current Month Budget
router.get("/:id", getBudgetById); // MARK: Get Budget by ID
router.put("/:id", updateBudget); // MARK: Update Budget
router.delete("/:id", deleteBudget); // MARK: Delete Budget

export default router;

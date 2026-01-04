"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budget_controller_1 = require("../controllers/budget.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.auth);
router.post("/", budget_controller_1.createBudget); // MARK: Create Budget
router.get("/", budget_controller_1.getBudgets); // MARK: Get All Budgets
router.get("/current", budget_controller_1.getCurrentMonthBudget); // MARK: Get Current Month Budget
router.get("/:id", budget_controller_1.getBudgetById); // MARK: Get Budget by ID
router.put("/:id", budget_controller_1.updateBudget); // MARK: Update Budget
router.delete("/:id", budget_controller_1.deleteBudget); // MARK: Delete Budget
exports.default = router;

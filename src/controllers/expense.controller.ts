import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";
import { Expense, ExpenseSchema } from "../models/expenses";
import { Category } from "../models/categories";
import { Budget } from "../models/budget";

// MARK: Create Expense
export const createExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId, budgetId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(categoryId) ||
      !mongoose.Types.ObjectId.isValid(budgetId)
    ) {
      return res.status(400).json({ message: "Invalid categoryId or budgetId" });
    }

    const validatedData = ExpenseSchema.parse(req.body);

    // Ensure category exists
    const categoryExists = await Category.exists({ _id: categoryId });
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Ensure budget exists
    const budgetExists = await Budget.exists({ _id: budgetId });
    if (!budgetExists) {
      return res.status(404).json({ message: "Budget not found" });
    }

    const expense = await Expense.create({
      ...validatedData,
      categoryId,
      budgetId,
    });

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.message,
      });
    }

    next(error);
  }
};

// MARK: Get All Expenses
export const getExpenses = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const expenses = await Expense.find()
      .populate("categoryId", "name color")
      .populate("budgetId", "month year")
      .sort({ date: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

// MARK: Get Expense by ID
export const getExpenseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const expense = await Expense.findById(id)
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
  } catch (error) {
    next(error);
  }
};

// MARK: Get Expenses by Budget
export const getExpensesByBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { budgetId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(budgetId)) {
      return res.status(400).json({ message: "Invalid budget ID" });
    }

    const expenses = await Expense.find({ budgetId })
      .populate("categoryId", "name color")
      .sort({ date: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

// MARK: Update Expense
export const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const UpdateExpenseSchema = ExpenseSchema.partial();
    const validatedData = UpdateExpenseSchema.parse(req.body);

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedExpense,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.message,
      });
    }

    next(error);
  }
};

// MARK: Delete Expense
export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
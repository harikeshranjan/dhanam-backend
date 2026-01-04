import { NextFunction, Request, Response } from "express";
import { Budget, BudgetSchema, UpdateBudgetSchema } from "../models/budget";
import { ZodError } from "zod";
import mongoose from "mongoose";

// MARK: Create Budget
export const createBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedBudget = BudgetSchema.parse(req.body);

    const newBudget = new Budget(validatedBudget);
    await newBudget.save();

    res.status(201).json({ success: true, data: newBudget });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.message
      })
    }
    next(error);
  }
};

// MARK: Get Budgets
export const getBudgets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const budgets = await Budget.find().sort({ year: -1, month: -1 });
    res.status(200).json({ success: true, data: budgets });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues
      });
    }
    next(error);
  }
};

// MARK: Get Current Month Budget
export const getCurrentMonthBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const budget = await Budget.findOne({ month, year });

    if (!budget) {
      return res.status(404).json({ message: "No budget found for the current month" });
    }

    res.status(200).json({ success: true, data: budget });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues
      });
    }
    next(error);
  }
};

// MARK: Get Budget by ID
export const getBudgetById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid budget ID" });
    }

    const budget = await Budget.findById(id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ success: true, data: budget });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues
      });
    }
    next(error);
  }
};

// MARK: Update Budget
export const updateBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid budget ID" });
    }

    const validatedBudget = UpdateBudgetSchema.parse(req.body);

    const updatedBudget = await Budget.findByIdAndUpdate(id, validatedBudget, { new: true });

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ success: true, data: updatedBudget });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues
      });
    }
    next(error);
  }
};

// MARK: Delete Budget
export const deleteBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid budget ID" });
    }

    const deletedBudget = await Budget.findByIdAndDelete(id);

    if (!deletedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ success: true, message: "Budget deleted successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues
      });
    }
    next(error);
  }
};
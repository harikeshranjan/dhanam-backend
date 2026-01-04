import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";
import { Category, CategorySchema } from "../models/categories";

// MARK: Create Category
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = CategorySchema.parse(req.body);

    const category = await Category.create(validatedData);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.message,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Category with this name already exists",
      });
    }

    next(error);
  }
};

// MARK: Get All Categories
export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// MARK: Get Category by ID
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const category = await Category.findById(id).lean();

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// MARK: Update Category
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const UpdateCategorySchema = CategorySchema.partial();
    const validatedData = UpdateCategorySchema.parse(req.body);

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.message,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Category with this name already exists",
      });
    }

    next(error);
  }
};

// MARK: Delete Category
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
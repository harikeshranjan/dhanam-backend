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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const categories_1 = require("../models/categories");
// MARK: Create Category
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = categories_1.CategorySchema.parse(req.body);
        const category = yield categories_1.Category.create(validatedData);
        res.status(201).json({
            success: true,
            data: category,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
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
});
exports.createCategory = createCategory;
// MARK: Get All Categories
const getCategories = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_1.Category.find()
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json({
            success: true,
            data: categories,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCategories = getCategories;
// MARK: Get Category by ID
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }
        const category = yield categories_1.Category.findById(id).lean();
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({
            success: true,
            data: category,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCategoryById = getCategoryById;
// MARK: Update Category
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }
        const UpdateCategorySchema = categories_1.CategorySchema.partial();
        const validatedData = UpdateCategorySchema.parse(req.body);
        const updatedCategory = yield categories_1.Category.findByIdAndUpdate(id, validatedData, { new: true, runValidators: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({
            success: true,
            data: updatedCategory,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
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
});
exports.updateCategory = updateCategory;
// MARK: Delete Category
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }
        const deletedCategory = yield categories_1.Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategory = deleteCategory;

import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.use(auth);

router.post("/", createCategory); // MARK: Create Category
router.get("/", getCategories); // MARK: Get All Categories
router.get("/:id", getCategoryById); // MARK: Get Category by ID
router.put("/:id", updateCategory); // MARK: Update Category
router.delete("/:id", deleteCategory); // MARK: Delete Category

export default router;

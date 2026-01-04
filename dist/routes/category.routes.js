"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.auth);
router.post("/", category_controller_1.createCategory); // MARK: Create Category
router.get("/", category_controller_1.getCategories); // MARK: Get All Categories
router.get("/:id", category_controller_1.getCategoryById); // MARK: Get Category by ID
router.put("/:id", category_controller_1.updateCategory); // MARK: Update Category
router.delete("/:id", category_controller_1.deleteCategory); // MARK: Delete Category
exports.default = router;

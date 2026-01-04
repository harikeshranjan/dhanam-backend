"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.CategorySchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.CategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().optional(),
    color: zod_1.z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "Invalid color code").optional(),
});
const categoryMongooseSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    color: { type: String },
}, { timestamps: true });
exports.Category = mongoose_1.models.Category || (0, mongoose_1.model)("Category", categoryMongooseSchema);

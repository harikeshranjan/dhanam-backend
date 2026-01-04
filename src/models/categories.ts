import mongoose, { Schema, model, models } from "mongoose";
import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  color: z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "Invalid color code").optional(),
})

export type ICategory = z.infer<typeof CategorySchema> & {
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const categoryMongooseSchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  color: { type: String },
}, { timestamps: true });

export const Category = models.Category || model<ICategory>("Category", categoryMongooseSchema);
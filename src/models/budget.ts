import mongoose, { Schema, model, models } from "mongoose";
import { z } from "zod";

export const BudgetSchema = z.object({
  month: z.number().min(1).max(12, "Month must be between 1 and 12"),
  year: z.number().min(2000, "Year must be 2000 or later"),
  totalAmount: z.number().min(0, "Total amount must be non-negative"),
})

export type IBudget = z.infer<typeof BudgetSchema> & {
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const budgetMongooseSchema = new Schema<IBudget>({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

budgetMongooseSchema.index({ month: 1, year: 1 }, { unique: true });

export const Budget = models.Budget || model<IBudget>("Budget", budgetMongooseSchema);
export const UpdateBudgetSchema = BudgetSchema.partial();
import mongoose, { model, models, Schema } from 'mongoose';
import { z } from 'zod';

export const ExpenseSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().optional(),
  date: z.coerce.date()
});

export type IExpense = z.infer<typeof ExpenseSchema> & {
  _id?: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  budgetId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

const expenseMongooseSchema = new Schema<IExpense>({
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  budgetId: { type: Schema.Types.ObjectId, required: true, ref: 'Budget' },
}, { timestamps: true });

export const Expense = models.Expense || model<IExpense>('Expense', expenseMongooseSchema);
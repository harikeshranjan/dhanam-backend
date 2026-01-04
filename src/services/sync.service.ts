import { Expense } from "../models/expenses";
import { Budget } from "../models/budget";
import { Category } from "../models/categories";

export const syncService = {
  async getAggregatedData(since?: string) {
    const filter = since ? { updatedAt: { $gt: new Date(since) } } : {};

    const [expenses, budgets, categories] = await Promise.all([
      Expense.find(filter).sort({ updatedAt: -1 }),
      Category.find(filter),
      Budget.find(filter),
    ]);

    return {
      expenses,
      budgets,
      categories,
      serverTimer: new Date().toISOString(),
    };
  }
};
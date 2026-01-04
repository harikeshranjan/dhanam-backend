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
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncService = void 0;
const expenses_1 = require("../models/expenses");
const budget_1 = require("../models/budget");
const categories_1 = require("../models/categories");
exports.syncService = {
    getAggregatedData(since) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = since ? { updatedAt: { $gt: new Date(since) } } : {};
            const [expenses, budgets, categories] = yield Promise.all([
                expenses_1.Expense.find(filter).sort({ updatedAt: -1 }),
                categories_1.Category.find(filter),
                budget_1.Budget.find(filter),
            ]);
            return {
                expenses,
                budgets,
                categories,
                serverTimer: new Date().toISOString(),
            };
        });
    }
};

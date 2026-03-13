import {
  ApiResponse,
  DeleteResponse,
  GetAllResponse,
  SingleEntityResponse,
} from "@/modules/shared/interfaces/apiResponse";
import { ExpenseCategory } from "../../expenses/enums/expenseCategory";

export interface Expense {
  id: string;
  userId: string;
  deliveryId: string;
  category: ExpenseCategory;
  incurredAt: Date;
  amount: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type ExpenseCategoriesListResponse = ApiResponse<ExpenseCategory[]>;

export type ExpensesListResponse = GetAllResponse<Expense>;

export type ExpenseResponse = SingleEntityResponse<Expense>;

export type CreateExpenseResponse = SingleEntityResponse<Expense>;

export type UpdateExpenseResponse = SingleEntityResponse<Expense>;

export type DeleteExpenseResponse = DeleteResponse;

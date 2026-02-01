import { api } from "@/lib/axios";
import { CreateExpenseSchemaType, ExpenseIdSchemaType, UpdateExpenseSchemaType } from "../schemas/expense";
import {
  CreateExpenseResponse,
  DeleteExpenseResponse,
  ExpenseCategoriesListResponse,
  ExpenseResponse,
  ExpensesListResponse,
  UpdateExpenseResponse,
} from "../interfaces/expenseResponse";
import { ExpensesListParams } from "../interfaces/expenseParams";

export const expensesApi = {
  getAllCategories: async () => {
    const response = await api.get<ExpenseCategoriesListResponse>("/expenses/categories");
    return response.data;
  },
  getAll: async (params: ExpensesListParams) => {
    const response = await api.get<ExpensesListResponse>("/expenses", { params });
    return response.data;
  },
  getOne: async (id: ExpenseIdSchemaType) => {
    const response = await api.get<ExpenseResponse>(`/expenses/${id}`);
    return response.data;
  },
  create: async (payload: CreateExpenseSchemaType) => {
    console.log("Creating expense with payload:", payload);
    const response = await api.post<CreateExpenseResponse>("/expenses", payload);
    return response.data;
  },
  update: async (id: ExpenseIdSchemaType, payload: UpdateExpenseSchemaType) => {
    const response = await api.patch<UpdateExpenseResponse>(`/expenses/${id}`, payload);
    return response.data;
  },
  delete: async (id: ExpenseIdSchemaType) => {
    const response = await api.delete<DeleteExpenseResponse>(`/expenses/${id}`);
    return response.data;
  },
};

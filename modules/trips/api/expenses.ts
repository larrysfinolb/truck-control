import { api } from "@/lib/axios";
import {
  CreateExpenseResponse,
  DeleteExpenseResponse,
  ExpenseCategoriesListResponse,
  ExpenseResponse,
  ExpensesListResponse,
  UpdateExpenseResponse,
} from "../interfaces/expenseResponse";
import { ExpensesListParams } from "../interfaces/expenseParams";
import {
  CreateExpenseSchemaType,
  ExpenseIdSchemaType,
  UpdateExpenseSchemaType,
} from "@/modules/trips/schemas/expense";

export const expensesApi = {
  getAllCategories: async () => {
    const response = await api.get<ExpenseCategoriesListResponse>("deliveries/expenses/categories");
    return response.data;
  },
  getAll: async (params: ExpensesListParams) => {
    const response = await api.get<ExpensesListResponse>("deliveries/expenses", { params });
    return response.data;
  },
  getOne: async (id: ExpenseIdSchemaType) => {
    const response = await api.get<ExpenseResponse>(`deliveries/expenses/${id}`);
    return response.data;
  },
  create: async (payload: CreateExpenseSchemaType) => {
    const response = await api.post<CreateExpenseResponse>("deliveries/expenses", payload);
    return response.data;
  },
  update: async (id: ExpenseIdSchemaType, payload: UpdateExpenseSchemaType) => {
    const response = await api.patch<UpdateExpenseResponse>(`deliveries/expenses/${id}`, payload);
    return response.data;
  },
  delete: async (id: ExpenseIdSchemaType) => {
    const response = await api.delete<DeleteExpenseResponse>(`deliveries/expenses/${id}`);
    return response.data;
  },
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { expensesApi } from "../api/expenses";
import { ExpensesListParams } from "../interfaces/expenseParams";
import { CreateExpenseSchemaType, ExpenseIdSchemaType, UpdateExpenseSchemaType } from "../schemas/expense";
import { QUERY_KEYS } from "../consts/query-keys";

const KEYS = {
  expenses: "expenses",
  categories: "categories",
};

export const useExpenses = (params: ExpensesListParams) => {
  return useQuery({
    queryKey: [KEYS.expenses, params],
    queryFn: async () => expensesApi.getAll(params),
  });
};

export const useExpense = (id: ExpenseIdSchemaType) => {
  return useQuery({
    queryKey: [KEYS.expenses, id],
    queryFn: () => expensesApi.getOne(id),
    enabled: !!id,
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExpenseSchemaType) => expensesApi.create(data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRIPS, data.deliveryId] });
    },
    onError: (error) => {
      console.error("Create expense failed:", error);
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: ExpenseIdSchemaType; data: UpdateExpenseSchemaType }) =>
      expensesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.expenses] });
    },
    onError: (error) => {
      console.error("Update expense failed:", error);
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: ExpenseIdSchemaType) => expensesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.expenses] });
    },
    onError: (error) => {
      console.error("Delete expense failed:", error);
    },
  });
};

export const useExpenseCategories = () => {
  return useQuery({
    queryKey: [KEYS.expenses, KEYS.categories],
    queryFn: () => expensesApi.getAllCategories(),
  });
};

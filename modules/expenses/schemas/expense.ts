import z from "zod";
import { ExpenseCategory } from "../components/expenseCategory";

export const createExpenseSchema = z.object({
  category: z.enum(ExpenseCategory),
  incurredAt: z.string().refine((date) => !isNaN(Date.parse(date))),
  amount: z.number().positive(),
  note: z
    .string()
    .max(500)
    .transform((val) => (val === "" ? undefined : val)),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export const expenseIdSchema = z.uuid();

export type CreateExpenseSchemaType = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseSchemaType = z.infer<typeof updateExpenseSchema>;
export type ExpenseIdSchemaType = z.infer<typeof expenseIdSchema>;

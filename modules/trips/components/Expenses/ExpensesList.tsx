import { DataTable } from "@/modules/shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Expense } from "../../interfaces/expenseResponse";
import { useMemo } from "react";

interface ExpensesListTableProps {
  data: Expense[];
}

export function ExpensesListTable({ data }: ExpensesListTableProps) {
  const totalAmount = data.reduce((sum, expense) => sum + expense.amount, 0);

  const columns = useMemo<ColumnDef<Expense>[]>(
    () => [
      {
        accessorKey: "index",
        header: "#",
      },
      {
        accessorKey: "incurredAt",
        header: "Incurred At",
        cell: ({ row }) => {
          const date = new Date(row.original.incurredAt);
          return date.toLocaleDateString();
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
          return row.original.category;
        },
        footer: () => {
          return "Total Amount:";
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
          const amount: number = row.original.amount;
          return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount);
        },
        footer: () => {
          return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(totalAmount);
        },
      },
      {
        accessorKey: "note",
        header: "Note",
      },
    ],
    [totalAmount]
  );

  return <DataTable columns={columns} data={data} />;
}

import { DataTable } from "@/modules/shared/components/Table";
import { Expense } from "../../interfaces/expenseResponse";
import { ColumnDef } from "@tanstack/react-table";

interface ExpensesListTableProps {
  data: Expense[];
}

const COLUMNS: ColumnDef<Expense>[] = [
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
  },
  {
    accessorKey: "note",
    header: "Note",
  },
];

export function ExpensesListTable({ data }: ExpensesListTableProps) {
  return <DataTable columns={COLUMNS} data={data} />;
}

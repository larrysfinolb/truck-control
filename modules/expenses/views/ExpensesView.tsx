"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { useExpenses } from "../hooks/useExpenses";
import { useState } from "react";
import { ExpensesLayout } from "../layouts/ExpensesLayout";
import { CreateExpense } from "../components/Dialogs/CreateExpense";
import { ExpensesListTable } from "../components/Tables/ExpensesList";

export default function ExpensesView() {
  usePageTitle("Expenses");
  const [params, _setParams] = useState({
    page: 1,
    limit: 100,
  });

  const { data: expenses } = useExpenses(params);

  return (
    <ExpensesLayout>
      <div className='flex justify-end'>
        <CreateExpense />
      </div>
      <ExpensesListTable data={expenses?.data || []} />
    </ExpensesLayout>
  );
}

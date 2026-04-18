import { Delivery } from "../../interfaces/trip";
import { CreateExpense } from "./CreateExpense";
import { ExpensesListTable } from "./ExpensesList";

interface ExpensesProps {
  trip: Delivery;
  className?: string;
}

export function Expenses({ trip }: ExpensesProps) {
  const { id, expenses } = trip;

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex  justify-between items-center'>
        <h2 className='text-lg font-semibold leading-none tracking-tight'>Expenses</h2>
        <CreateExpense tripId={id} />
      </div>

      <ExpensesListTable data={expenses} />
    </section>
  );
}

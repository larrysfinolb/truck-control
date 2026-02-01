import { useApiError } from "@/modules/shared/hooks/useApiError";
import { useCreateExpense, useExpenseCategories } from "../../hooks/useExpenses";
import { useForm } from "@tanstack/react-form";
import { createExpenseSchema } from "../../schemas/expense";
import { Button } from "@/modules/shared/components/UI/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/shared/components/UI/dialog";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/modules/shared/components/UI/field";
import { Input } from "@/modules/shared/components/UI/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/shared/components/UI/select";
import { ExpenseCategory } from "../expenseCategory";
import { AppAlert } from "@/modules/shared/components/Alert";

export function CreateExpense() {
  const createExpense = useCreateExpense();
  const errorDisplay = useApiError(createExpense.error);

  const { data: categories } = useExpenseCategories();

  const form = useForm({
    defaultValues: {
      category: "",
      incurredAt: new Date().toISOString().split("T")[0],
      amount: 0,
      note: "",
    },
    validators: {
      onSubmit: createExpenseSchema,
      onChange: createExpenseSchema,
    },
    onSubmit: async ({ value }) => {
      await createExpense.mutateAsync({ ...value, category: value.category as ExpenseCategory });
      form.reset();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Add Expense</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-135'>
        <DialogHeader>
          <DialogTitle>Create Expense</DialogTitle>
          <DialogDescription>Fill out the form below to create a new expense.</DialogDescription>
        </DialogHeader>
        <FieldSet>
          <form.Field name='category'>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} required>
                    Category
                  </FieldLabel>
                  <Select value={field.state.value} onValueChange={(val) => field.handleChange(val)}>
                    <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                    <SelectContent>
                      {(categories?.data ?? []).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <FieldGroup>
            <form.Field name='incurredAt'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Incurred At
                    </FieldLabel>
                    <Input
                      type='date'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='Select date'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <form.Field name='amount'>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} required>
                    Amount
                  </FieldLabel>
                  <Input
                    type='number'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    aria-invalid={isInvalid}
                    placeholder='Enter amount'
                    autoComplete='off'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name='note'>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Note</FieldLabel>
                  <Input
                    type='text'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder='Enter note (optional)'
                    autoComplete='off'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {createExpense.isError && errorDisplay && (
            <AppAlert variant='destructive' title={errorDisplay.title} description={errorDisplay.message} />
          )}
        </FieldSet>
        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

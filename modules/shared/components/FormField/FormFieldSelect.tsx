import { Field, FieldDescription, FieldError, FieldLabel } from "@/modules/shared/components/UI/field";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/shared/components/UI/select";

interface FormFieldSelectProps<TOption> extends Omit<
  React.ComponentProps<typeof Select>,
  "value" | "onValueChange" | "children"
> {
  field: AnyFieldApi;
  label: React.ReactNode;
  description?: React.ReactNode;
  options: TOption[];
  placeholder?: string;
  required?: boolean;
  getOptionValue: (option: TOption) => string;
  getOptionLabel: (option: TOption) => React.ReactNode;
}

export function FormFieldSelect<TOption>({
  field,
  label,
  description,
  options,
  getOptionValue,
  getOptionLabel,
  required,
  placeholder,
  ...selectProps
}: FormFieldSelectProps<TOption>) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className='flex flex-col gap-2'>
      <FieldLabel htmlFor={field.name} required={required}>
        {label}
      </FieldLabel>

      {description && <FieldDescription className='text-xs'>{description}</FieldDescription>}

      <Select
        {...selectProps}
        value={field.state.value ?? ""}
        onValueChange={(nextValue) => field.handleChange(nextValue === "" ? null : nextValue)}
      >
        <SelectTrigger id={field.name} aria-invalid={isInvalid} disabled={selectProps.disabled}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option, _index) => {
            const optionValue = getOptionValue(option);

            return (
              <SelectItem key={optionValue} value={optionValue}>
                {getOptionLabel(option)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

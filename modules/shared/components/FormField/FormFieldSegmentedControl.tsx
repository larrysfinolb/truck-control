import type { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../UI/field";
import { SegmentedControl, SegmentedControlItem } from "../UI/segmented-control";

interface FormFieldSegmentedControlProps<TOption> extends Omit<
  React.ComponentProps<typeof SegmentedControl>,
  "value" | "defaultValue" | "onValueChange" | "children"
> {
  field: AnyFieldApi;
  label: React.ReactNode;
  description?: React.ReactNode;
  options: TOption[];
  required?: boolean;
  getOptionValue: (option: TOption) => string;
  getOptionLabel: (option: TOption) => React.ReactNode;
  onValueChange?: (value: string) => void;
}

export function FormFieldSegmentedControl<TOption>({
  field,
  label,
  description,
  options,
  required,
  getOptionValue,
  getOptionLabel,
  onValueChange,
  ...segmentedControlProps
}: FormFieldSegmentedControlProps<TOption>) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className='flex flex-col gap-2'>
      <FieldLabel htmlFor={field.name} required={required}>
        {label}
      </FieldLabel>

      {description && <FieldDescription className='text-xs'>{description}</FieldDescription>}

      <SegmentedControl
        {...segmentedControlProps}
        value={field.state.value ?? ""}
        onValueChange={(value) => {
          field.handleChange(value);
          onValueChange?.(value);
        }}
      >
        {options.map((option) => {
          const optionValue = getOptionValue(option);

          return (
            <SegmentedControlItem key={optionValue} value={optionValue}>
              {getOptionLabel(option)}
            </SegmentedControlItem>
          );
        })}
      </SegmentedControl>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

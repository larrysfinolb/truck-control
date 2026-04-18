import { Field, FieldDescription, FieldError, FieldLabel } from "@/modules/shared/components/UI/field";
import { Input } from "../UI/input";
import type { AnyFieldApi } from "@tanstack/react-form";

interface FormFieldInputBaseProps
  extends Omit<React.ComponentProps<typeof Input>, "id" | "name" | "onChange" | "onBlur"> {
  label: React.ReactNode;
  description?: React.ReactNode;
  type: HTMLInputElement["type"];
}

interface FormFieldInputWithFieldProps extends FormFieldInputBaseProps {
  field: AnyFieldApi;
  inputId?: never;
  inputName?: never;
}

interface FormFieldInputReadOnlyProps extends FormFieldInputBaseProps {
  field?: undefined;
  inputId: string;
  inputName: string;
  readOnly: true;
}

type FormFieldInputProps = FormFieldInputWithFieldProps | FormFieldInputReadOnlyProps;

const getChangeValue = (type: HTMLInputElement["type"], value: unknown) => {
  if (type === "number") {
    return value === null ? null : Number(value);
  }

  return value === null ? null : value;
};

export function FormFieldInput({
  field,
  inputId,
  inputName,
  label,
  description,
  type,
  required,
  readOnly,
  value,
  ...inputProps
}: FormFieldInputProps) {
  const isInvalid = field ? field.state.meta.isTouched && !field.state.meta.isValid : false;
  const resolvedInputId = field?.name ?? inputId;
  const resolvedInputName = field?.name ?? inputName;

  return (
    <Field data-invalid={isInvalid} className='flex flex-col gap-2'>
      <FieldLabel htmlFor={resolvedInputId} required={required}>
        {label}
      </FieldLabel>

      {description && <FieldDescription className='text-xs'>{description}</FieldDescription>}

      <Input
        {...inputProps}
        type={type}
        id={resolvedInputId}
        name={resolvedInputName}
        value={readOnly ? (value ?? field?.state.value ?? "") : (field?.state.value ?? "")}
        onBlur={field?.handleBlur}
        onChange={!readOnly && field ? (event) => field.handleChange(getChangeValue(type, event.target.value)) : undefined}
        aria-invalid={isInvalid}
        readOnly={readOnly}
      />

      {isInvalid && field && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

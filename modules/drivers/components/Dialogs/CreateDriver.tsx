import { useApiError } from "@/modules/shared/hooks/useApiError";
import { useForm } from "@tanstack/react-form";
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
import { AppAlert } from "@/modules/shared/components/Alert";
import { useCreateDriver } from "../../hooks/useDrivers";
import { createDriverSchema } from "../../schemas/driver";
import { useState } from "react";
import { DriverLicenseInput } from "../DriverLicenseInput/DriverLicenseInput";
import { PhoneInput } from "@/modules/shared/components/UI/phone-input";

export function CreateDriver() {
  const createDriver = useCreateDriver();
  const errorDisplay = useApiError(createDriver.error);
  // TODO: Implementar el guardado de imágenes las licencias.
  const [driverLicense, setDriverLicense] = useState<File[]>([]);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validators: {
      onSubmit: createDriverSchema,
      onChange: createDriverSchema,
    },
    onSubmit: async ({ value }) => {
      await createDriver.mutateAsync(value);
      form.reset();
      setDriverLicense([]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Add Driver</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-135'>
        <DialogHeader>
          <DialogTitle>Create Driver</DialogTitle>
          <DialogDescription>Fill out the form below to create a new driver.</DialogDescription>
        </DialogHeader>
        <FieldSet>
          <FieldGroup className='flex flex-row gap-4'>
            <form.Field name='firstName'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      First Name
                    </FieldLabel>
                    <Input
                      type='text'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='Enter first name'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name='lastName'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Last Name
                    </FieldLabel>
                    <Input
                      type='text'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='Enter last name'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <form.Field name='phoneNumber'>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} required>
                    Phone Number
                  </FieldLabel>
                  <PhoneInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(value) => field.handleChange(value)}
                    aria-invalid={isInvalid}
                    defaultCountry='US'
                    placeholder='Enter a phone number'
                    international
                  />
                  {/* <Input
                    type='tel'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder='Enter phone number'
                    autoComplete='off'
                  /> */}
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Field>
            <FieldLabel htmlFor='driverLicense'>Driver License</FieldLabel>
            <DriverLicenseInput value={driverLicense} onChange={setDriverLicense} />
          </Field>

          {createDriver.isError && errorDisplay && (
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

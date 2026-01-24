"use client";

import { Button } from "@/modules/shared/components/UI/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/shared/components/UI/dialog";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/modules/shared/components/UI/field";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Input } from "@/modules/shared/components/UI/input";
import { DialogDescription } from "@radix-ui/react-dialog";

const FORM_SCHEMA = z.object({
  vehicle: z
    .string()
    .min(2, "Vehicle must be at least 2 characters.")
    .max(32, "Vehicle must be at most 32 characters."),
  driver: z
    .string()
    .min(2, "Driver name must be at least 2 characters.")
    .max(32, "Driver name must be at most 32 characters."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date.",
  }),
  origin: z.string().min(2, "Origin must be at least 2 characters.").max(64, "Origin must be at most 64 characters."),
  destination: z
    .string()
    .min(2, "Destination must be at least 2 characters.")
    .max(64, "Destination must be at most 64 characters."),
  miles: z.number().min(0, "Miles must be a positive number."),
  ratePerMile: z
    .number()
    .min(0, "Rate per mile must be a positive number.")
    .max(1, "Rate per mile must be at most 100."),
  milesDeadhead: z.number().min(0, "Deadhead miles must be a positive number."),
  ratePerMileDeadhead: z
    .number()
    .min(0, "Rate per mile deadhead must be a positive number.")
    .max(1, "Rate per mile deadhead must be at most 100."),
});

export function CreateBasedOnMileageDialog() {
  const form = useForm({
    defaultValues: {
      vehicle: "",
      driver: "",
      date: new Date().toISOString().split("T")[0],
      origin: "",
      destination: "",
      miles: 0,
      milesDeadhead: 0,
      ratePerMile: 0,
      ratePerMileDeadhead: 0,
    },
    validators: {
      onSubmit: FORM_SCHEMA,
      onChange: FORM_SCHEMA,
    },
    onSubmit: async ({ value }) => {
      form.reset();
    },
  });

  const handleSubmit = () => {
    form.handleSubmit();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Add Delivery</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-135'>
        <DialogHeader>
          <DialogTitle>Create Delivery Based on Mileage</DialogTitle>
          <DialogDescription>Fill out the form below to create a new delivery based on mileage.</DialogDescription>
        </DialogHeader>
        <FieldSet>
          <FieldGroup>
            <form.Field name='vehicle'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Vehicle
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='Enter vehicle identifier'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <FieldGroup>
            <form.Field name='driver'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Driver
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='Enter driver name'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <FieldGroup>
            <form.Field name='date'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Date
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

          <FieldGroup className='flex flex-row gap-4'>
            <form.Field name='origin'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Origin
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='Enter origin'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name='destination'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Destination
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='Enter destination'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <FieldGroup className='flex flex-row gap-4'>
            <form.Field name='miles'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Miles
                    </FieldLabel>
                    <Input
                      type='number'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      placeholder='Enter miles'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name='ratePerMile'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Rate per Mile
                    </FieldLabel>
                    <Input
                      type='number'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      placeholder='Enter rate per mile'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <FieldGroup className='flex flex-row gap-4'>
            <form.Field name='milesDeadhead'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      <span>Deadhead Miles</span>
                      <span className='text-destructive'>*</span>
                    </FieldLabel>
                    <Input
                      type='number'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      placeholder='Enter deadhead miles'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name='ratePerMileDeadhead'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Rate per Mile Deadhead
                    </FieldLabel>
                    <Input
                      type='number'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      placeholder='Enter rate per mile deadhead'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
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

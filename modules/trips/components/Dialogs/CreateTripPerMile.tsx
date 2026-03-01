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
import { Input } from "@/modules/shared/components/UI/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import { mileageDeliverySchema } from "../../schemas/delivery";
import { DeliveryType } from "../../enums/deliveryType";
import { useCreateDelivery } from "../../hooks/useDeliveries";
import { useApiError } from "@/modules/shared/hooks/useApiError";
import { FailedAlert } from "../Alerts/FailedAlert";
import { calculateMileageTotalPayment } from "../../helpers/calculateMileageTotalPayment";
import { useTrucks } from "@/modules/trucks/hooks/useTrucks";
import { useDrivers } from "@/modules/drivers/hooks/useDrivers";
import { TruckSelect } from "@/modules/trucks/components/TruckSelect/TruckSelect";
import { DriverSelect } from "@/modules/drivers/components/DriverSelect/DriverSelect";

export function CreateTripPerMile() {
  const createDelivery = useCreateDelivery();
  const errorDisplay = useApiError(createDelivery.error);
  const { data: trucks } = useTrucks({});
  const { data: drivers } = useDrivers({});

  const form = useForm({
    defaultValues: {
      type: DeliveryType.MILEAGE_BASED,
      vehicleId: "",
      driverId: "",
      pickupDate: new Date().toISOString().split("T")[0],
      origin: "",
      destination: "",
      miles: 0,
      deadheadMiles: 0,
      ratePerMile: 0,
      ratePerDeadheadMile: 0,
    },
    validators: {
      onSubmit: mileageDeliverySchema.omit({ totalPayment: true }),
      onChange: mileageDeliverySchema.omit({ totalPayment: true }),
    },
    onSubmit: async ({ value }) => {
      const totalPayment = calculateMileageTotalPayment(
        value.miles,
        value.ratePerMile,
        value.deadheadMiles,
        value.ratePerDeadheadMile
      );

      await createDelivery.mutateAsync({ ...value, totalPayment });
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
        <Button variant='outline'>Add Trip</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-135'>
        <DialogHeader>
          <DialogTitle>Create Trip Per Mile</DialogTitle>
          <DialogDescription>Fill out the form below to create a new trip per mile.</DialogDescription>
        </DialogHeader>
        <FieldSet>
          <form.Field name='type'>
            {(field) => <input type='hidden' id={field.name} name={field.name} value={field.state.value} readOnly />}
          </form.Field>

          <FieldGroup>
            <form.Field name='vehicleId'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Trucks
                    </FieldLabel>
                    <TruckSelect
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                      trucks={trucks?.data || []}
                      id={field.name}
                      isInvalid={isInvalid}
                      placeholder='Select a vehicle'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <FieldGroup>
            <form.Field name='driverId'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Driver
                    </FieldLabel>
                    <DriverSelect
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                      drivers={drivers?.data || []}
                      id={field.name}
                      isInvalid={isInvalid}
                      placeholder='Select a driver'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <FieldGroup>
            <form.Field name='pickupDate'>
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
            <form.Field name='deadheadMiles'>
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

            <form.Field name='ratePerDeadheadMile'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Rate per Deadhead Mile
                    </FieldLabel>
                    <Input
                      type='number'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      placeholder='Enter rate per deadhead mile'
                      autoComplete='off'
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <FieldGroup>
            <form.Subscribe
              selector={(state) => ({
                miles: state.values.miles,
                ratePerMile: state.values.ratePerMile,
                deadheadMiles: state.values.deadheadMiles,
                ratePerDeadheadMile: state.values.ratePerDeadheadMile,
              })}
            >
              {(values) => {
                const { miles, ratePerMile, deadheadMiles, ratePerDeadheadMile } = values;
                const totalPayment = calculateMileageTotalPayment(
                  miles,
                  ratePerMile,
                  deadheadMiles,
                  ratePerDeadheadMile
                );

                return (
                  <Field>
                    <FieldLabel htmlFor='totalPayment'>Total Payment</FieldLabel>
                    <Input
                      type='number'
                      id='totalPayment'
                      name='totalPayment'
                      value={totalPayment}
                      readOnly
                      tabIndex={-1}
                      placeholder='Total payment will be calculated automatically'
                    />
                  </Field>
                );
              }}
            </form.Subscribe>
          </FieldGroup>

          {createDelivery.isError && errorDisplay && (
            <FailedAlert title={errorDisplay.title} description={errorDisplay.message} />
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

"use client";

import { useApiError } from "@/modules/shared/hooks/useApiError";
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
import { FormFieldInput } from "@/modules/shared/components/FormField/FormFieldInput";
import { FormFieldSegmentedControl } from "@/modules/shared/components/FormField/FormFieldSegmentedControl";
import { FormFieldSelect } from "@/modules/shared/components/FormField/FormFieldSelect";
import { FieldGroup, FieldSet } from "@/modules/shared/components/UI/field";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useDrivers } from "@/modules/drivers/hooks/useDrivers";
import { useTrucks } from "@/modules/trucks/hooks/useTrucks";
import { FailedAlert } from "./Alerts/FailedAlert";
import { TripType } from "../enums/tripTypes";
import { useCreateDelivery } from "../hooks/useTrips";
import type { TripFormValues } from "../interfaces/trip";
import { createTripSchema } from "../schemas/trip";
import { calculateFixedRateTotalPayment } from "../helpers/calculateFixedRateTotalPayment";
import { calculatePerMileTotalPayment } from "../helpers/calculatePerMileTotalPayment";

const getDefaultValues = (initialType: TripType): TripFormValues => ({
  type: initialType,
  vehicleId: null,
  driverId: null,
  pickupDate: null,
  origin: null,
  destination: null,
  rate: null,
  carrierFee: null,
  miles: null,
  deadheadMiles: null,
  ratePerMile: null,
  ratePerDeadheadMile: null,
});

const calculateTotalPayment = (values: TripFormValues): number => {
  let totalPayment = 0;

  switch (values.type) {
    case TripType.FIXED_RATE:
      const rate = values.rate ?? 0;
      const carrierFee = values.carrierFee ?? 0;
      totalPayment = calculateFixedRateTotalPayment(rate, carrierFee);
      break;
    case TripType.PER_MILE:
      const miles = values.miles ?? 0;
      const ratePerMile = values.ratePerMile ?? 0;
      const deadheadMiles = values.deadheadMiles ?? 0;
      const ratePerDeadheadMile = values.ratePerDeadheadMile ?? 0;
      totalPayment = calculatePerMileTotalPayment(miles, ratePerMile, deadheadMiles, ratePerDeadheadMile);
      break;
  }

  return totalPayment;
};

export function CreateTripDialog({ initialType = TripType.FIXED_RATE }) {
  const [open, setOpen] = useState(false);

  const createDelivery = useCreateDelivery();
  const errorDisplay = useApiError(createDelivery.error);
  const { data: trucks } = useTrucks({});
  const { data: drivers } = useDrivers({});

  const form = useForm({
    defaultValues: getDefaultValues(initialType),
    validators: {
      onSubmit: createTripSchema,
      onChange: createTripSchema,
    },
    onSubmit: async ({ value }) => {
      await createDelivery.mutateAsync(createTripSchema.parse(value));
      form.reset();
      setOpen(false);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    form.handleSubmit();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline'>Add Trip</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Create Trip</DialogTitle>
          <DialogDescription>Choose the trip type and complete the required information.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <FieldSet className='flex flex-col gap-4'>
            <form.Field name='type'>
              {(field) => (
                <FormFieldSegmentedControl
                  field={field}
                  label='Trip Type'
                  description='Defines how the trip is billed.'
                  options={[
                    { value: TripType.FIXED_RATE, label: "Fixed Rate" },
                    { value: TripType.PER_MILE, label: "Per Mile" },
                  ]}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                  onValueChange={() => {
                    form.setFieldValue("rate", null);
                    form.setFieldValue("carrierFee", null);
                    form.setFieldValue("miles", null);
                    form.setFieldValue("ratePerMile", null);
                    form.setFieldValue("deadheadMiles", null);
                    form.setFieldValue("ratePerDeadheadMile", null);
                  }}
                  required
                />
              )}
            </form.Field>

            <form.Field name='vehicleId'>
              {(field) => (
                <FormFieldSelect
                  field={field}
                  label='Truck'
                  description='Vehicle assigned to the trip.'
                  options={trucks?.data || []}
                  getOptionValue={(truck) => truck.id}
                  getOptionLabel={(truck) => `${truck.licensePlate} - ${truck.model}`}
                  placeholder='Select a vehicle'
                  required
                />
              )}
            </form.Field>

            <form.Field name='driverId'>
              {(field) => (
                <FormFieldSelect
                  field={field}
                  label='Driver'
                  description='Driver responsible for the trip.'
                  options={drivers?.data || []}
                  getOptionValue={(driver) => driver.id}
                  getOptionLabel={(driver) => `${driver.firstName} ${driver.lastName}`}
                  placeholder='Select a driver'
                  required
                />
              )}
            </form.Field>

            <form.Field name='pickupDate'>
              {(field) => (
                <FormFieldInput
                  field={field}
                  type='date'
                  label='Pickup Date'
                  description='Scheduled pickup date.'
                  required
                  placeholder='Select date'
                />
              )}
            </form.Field>

            <FieldGroup className='flex flex-row gap-4'>
              <form.Field name='origin'>
                {(field) => (
                  <FormFieldInput
                    field={field}
                    type='text'
                    label='Origin'
                    description='Location where the trip starts.'
                    required
                    placeholder='Enter origin'
                    autoComplete='off'
                  />
                )}
              </form.Field>
              <form.Field name='destination'>
                {(field) => (
                  <FormFieldInput
                    field={field}
                    type='text'
                    label='Destination'
                    description='Location where the trip ends.'
                    required
                    placeholder='Enter destination'
                    autoComplete='off'
                  />
                )}
              </form.Field>
            </FieldGroup>

            <form.Subscribe selector={(state) => state.values.type}>
              {(type) => (
                <>
                  {type === TripType.FIXED_RATE ? (
                    <>
                      <FieldGroup className='flex flex-row gap-4'>
                        <form.Field name='rate'>
                          {(field) => (
                            <FormFieldInput
                              field={field}
                              type='number'
                              label='Rate'
                              description='Gross amount charged for the trip.'
                              required
                              placeholder='Enter rate'
                              autoComplete='off'
                              step={0.01}
                            />
                          )}
                        </form.Field>
                        <form.Field name='carrierFee'>
                          {(field) => (
                            <FormFieldInput
                              field={field}
                              type='number'
                              label='Carrier Fee'
                              description='Portion of the rate kept by the carrier.'
                              required
                              placeholder='Enter carrier fee'
                              autoComplete='off'
                              step={0.01}
                            />
                          )}
                        </form.Field>
                      </FieldGroup>
                    </>
                  ) : (
                    <>
                      <FieldGroup className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <form.Field name='miles'>
                          {(field) => (
                            <FormFieldInput
                              field={field}
                              type='number'
                              label='Miles'
                              description='Loaded distance covered on the trip.'
                              required
                              placeholder='Enter miles'
                              autoComplete='off'
                              step={0.1}
                            />
                          )}
                        </form.Field>
                        <form.Field name='ratePerMile'>
                          {(field) => (
                            <FormFieldInput
                              field={field}
                              type='number'
                              label='Rate per Mile'
                              description='Amount paid for each loaded mile.'
                              required
                              placeholder='Enter rate per mile'
                              autoComplete='off'
                              step={0.01}
                            />
                          )}
                        </form.Field>
                        <form.Field name='deadheadMiles'>
                          {(field) => (
                            <FormFieldInput
                              field={field}
                              type='number'
                              label='Deadhead Miles'
                              description='Unloaded distance driven for the trip.'
                              placeholder='Enter deadhead miles'
                              autoComplete='off'
                              step={0.1}
                            />
                          )}
                        </form.Field>
                        <form.Field name='ratePerDeadheadMile'>
                          {(field) => (
                            <FormFieldInput
                              field={field}
                              type='number'
                              label='Rate per Deadhead Mile'
                              description='Amount paid for each unloaded mile.'
                              placeholder='Enter rate per deadhead mile'
                              autoComplete='off'
                              step={0.01}
                            />
                          )}
                        </form.Field>
                      </FieldGroup>
                    </>
                  )}
                </>
              )}
            </form.Subscribe>

            <form.Subscribe
              selector={(state) => ({
                type: state.values.type,
                rate: state.values.rate,
                carrierFee: state.values.carrierFee,
                miles: state.values.miles,
                ratePerMile: state.values.ratePerMile,
                deadheadMiles: state.values.deadheadMiles,
                ratePerDeadheadMile: state.values.ratePerDeadheadMile,
              })}
            >
              {(values) => (
                <FormFieldInput
                  type='number'
                  inputId='TotalPayment'
                  inputName='TotalPayment'
                  label='Total Payment'
                  description='Estimated payment for the trip according to its billing type.'
                  value={calculateTotalPayment({
                    ...values,
                    vehicleId: null,
                    driverId: null,
                    pickupDate: null,
                    origin: null,
                    destination: null,
                  })}
                  readOnly
                  tabIndex={-1}
                  placeholder='Total payment will be calculated automatically'
                />
              )}
            </form.Subscribe>

            {createDelivery.isError && errorDisplay && (
              <FailedAlert title={errorDisplay.title} description={errorDisplay.message} />
            )}
          </FieldSet>

          <DialogFooter className='gap-2'>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' disabled={createDelivery.isPending}>
              {createDelivery.isPending ? "Creating..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

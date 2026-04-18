import z from "zod";
import { TripType } from "../enums/tripTypes";

const createTripBaseSchema = z.object({
  type: z.enum(TripType),
  vehicleId: z.uuid(),
  driverId: z.uuid(),
  pickupDate: z.string().refine((value) => value !== null && !isNaN(Date.parse(value))),
  origin: z.string().trim().min(1),
  destination: z.string().trim().min(1),
});

export const createFixedRateTripSchema = createTripBaseSchema.extend({
  type: z.literal(TripType.FIXED_RATE),
  rate: z.number().positive(),
  carrierFee: z.number().min(0).max(1),
  miles: z.null(),
  ratePerMile: z.null(),
  deadheadMiles: z.null(),
  ratePerDeadheadMile: z.null(),
});

export const createPerMileTripSchema = createTripBaseSchema.extend({
  type: z.literal(TripType.PER_MILE),
  rate: z.null(),
  carrierFee: z.null(),
  miles: z.number().positive(),
  ratePerMile: z.number().positive(),
  deadheadMiles: z.number().min(0),
  ratePerDeadheadMile: z.number().min(0),
});

export const createTripSchema = z.discriminatedUnion("type", [createFixedRateTripSchema, createPerMileTripSchema]);

export const tripIdSchema = z.uuid();

export type TripSchemaType = z.output<typeof createTripSchema>;
export type CreateTripSchemaType = z.output<typeof createTripSchema>;
export type UpdateTripSchemaType = z.output<typeof createTripSchema>;
export type TripIdSchemaType = z.infer<typeof tripIdSchema>;

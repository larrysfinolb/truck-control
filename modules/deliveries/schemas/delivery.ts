import z from "zod";
import { DeliveryType } from "../enums/deliveryType";

const baseDeliverySchema = z.object({
  type: z.enum(DeliveryType),
  vehicle: z.string().min(1),
  driver: z.string().min(1),
  pickupDate: z.string().refine((value) => !isNaN(Date.parse(value))),
  origin: z.string().min(1),
  destination: z.string().min(1),
});

export const rateDeliverySchema = baseDeliverySchema.extend({
  rate: z.number().positive(),
  carrierFee: z.number().min(0).max(1),
});

export const mileageDeliverySchema = baseDeliverySchema.extend({
  miles: z.number().positive(),
  ratePerMile: z.number().positive(),
  deadheadMiles: z.number().min(0),
  ratePerDeadheadMile: z.number().min(0),
});

export const updateDeliverySchema = z.object({
  ...rateDeliverySchema.shape,
  ...mileageDeliverySchema.shape,
});
export const deliveryIdSchema = z.uuid();

export type CreateDeliverySchemaType = z.infer<typeof rateDeliverySchema> | z.infer<typeof mileageDeliverySchema>;
export type UpdateDeliverySchemaType = z.infer<typeof updateDeliverySchema>;
export type DeliveryIdSchemaType = z.infer<typeof deliveryIdSchema>;

import z from "zod";

export const createTruckSchema = z.object({
  make: z.string().max(100),
  model: z.string().max(100),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
  color: z.string().max(50),
  licensePlate: z.string().max(20),
  vin: z.string().max(17),
});

export const updateTruckSchema = createTruckSchema.partial();

export const truckIdSchema = z.uuid();

export type CreateTruckSchemaType = z.infer<typeof createTruckSchema>;
export type UpdateTruckSchemaType = z.infer<typeof updateTruckSchema>;
export type TruckIdSchemaType = z.infer<typeof truckIdSchema>;

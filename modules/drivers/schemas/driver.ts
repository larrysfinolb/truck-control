import z from "zod";

export const createDriverSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().regex(/^\+\d{1,3}\d{10,12}$/, "Invalid phone number format"),
});

export const updateDriverSchema = createDriverSchema.partial();

export const driverIdSchema = z.uuid();

export type CreateDriverSchemaType = z.infer<typeof createDriverSchema>;
export type UpdateDriverSchemaType = z.infer<typeof updateDriverSchema>;
export type DriverIdSchemaType = z.infer<typeof driverIdSchema>;

import z from "zod";

export const signupSchema = z
  .object({
    email: z.email(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword);

export type SignupSchemaType = z.infer<typeof signupSchema>;

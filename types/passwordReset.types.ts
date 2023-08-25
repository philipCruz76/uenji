import { z } from "zod";

export const PasswordResetLinkValidator = z.object({
  token: z.string().min(20).max(20),
  email: z
    .string()
    .regex(/^\S+@\S+\.\S+$/)
    .min(5)
    .max(255),
});

export type PasswordResetLinkParams = z.infer<
  typeof PasswordResetLinkValidator
>;

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

export const PasswordResetSchema = z
  .string({
    required_error: "Password is required",
  })
  .min(8, { message: "At least 8 characters long." })
  .max(20, { message: "Password must be at most 20 characters long." })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter and one number",
  });

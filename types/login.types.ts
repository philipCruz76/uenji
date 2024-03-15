import { z, ZodType } from "zod";

export type LoginVariant = "signIn" | "join";

export type LoginCredentials = {
  email: string;
  password: string;
  confirmPassword?: string;
};
export const LoginValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password must be at most 20 characters long." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
});

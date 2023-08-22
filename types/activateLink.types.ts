import { z } from "zod";

export const ActivateLinkParamsValidator = z.object({
  token: z
    .string()
    .min(64)
    .max(64),
  email: z
    .string()
    .regex(/^\S+@\S+\.\S+$/)
    .min(5)
    .max(255),
});

export type ActivateLinkParams = z.infer<typeof ActivateLinkParamsValidator>;

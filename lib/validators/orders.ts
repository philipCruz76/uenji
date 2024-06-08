import { z } from "zod";

export const OrderDeliveryValidator = z.object({
  deliveryMessage: z.string().min(5, "Mínimo 5 caracteres"),
  deliveryFiles: z.array(z.string()),
});

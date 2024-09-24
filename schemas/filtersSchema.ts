import { z } from "zod";

export const filtersSchema = z.object({
  gender: z.array(z.string()),
  categories: z.array(z.string()),
  brand: z.array(z.string()),
  color: z.array(z.string()),
  sizes: z.array(z.string()),
  price: z.number().optional(),
});

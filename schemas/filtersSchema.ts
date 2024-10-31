import { z } from "zod";

export const filtersSchema = z.object({
  gender: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  brand: z.array(z.string()).optional(),
  color: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  price: z.number().optional(),
});

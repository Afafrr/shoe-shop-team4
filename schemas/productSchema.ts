import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Please enter product's name",
    })
    .trim(),
  price: z
    .number()
    .min(1, {
      message: "Please enter product's price",
    })
    .refine((price) => price > 0, {
      message: "Price must be greater than $0",
    }),
  color: z
    .array(z.string())
    .refine((array) => array.length !== 0, {
      message: "Please select at least 1 color",
    })
    .refine((array) => !array.some((value) => isNaN(Number(value))), {
      message: "Invalid colors",
    }),
  gender: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Invalid gender",
  }),
  brand: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Invalid brand",
  }),
  description: z
    .string()
    .min(1, {
      message: "Please enter product's description",
    })
    .min(10, {
      message: "Product's description must have at least 10 characters",
    })
    .trim(),
  sizes: z
    .array(z.string())
    .refine((array) => array.length !== 0, {
      message: "Please select at least 1 size",
    })
    .refine((array) => !array.some((value) => isNaN(Number(value))), {
      message: "Invalid size",
    }),
  image: z
    .array(z.instanceof(File))
    .refine((array) => array.length !== 0, { message: "Please upload image" }),
});

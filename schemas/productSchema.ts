import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Please enter product's name",
    })
    .max(50, "Name must be 50 characters or less")
    .trim(),
  price: z
    .number({ message: "Price must be a valid number" })
    .min(1, {
      message: "Price must be higher than 0",
    })
    .max(1000000, {
      message: "Price must be lower than $1,000,000",
    })
    .refine((price) => price > 0, {
      message: "Price must be greater than $0",
    }),
  categories: z
    .array(z.string())
    .refine((array) => array.length !== 0, {
      message: "Please select at least 1 category",
    })
    .refine((array) => !array.some((value) => isNaN(Number(value))), {
      message: "Invalid gender",
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
    .max(480, "Name must be 480 characters or less")
    .trim(),
  sizes: z
    .array(z.string())
    .refine((array) => array.length !== 0, {
      message: "Please select at least 1 size",
    })
    .refine((array) => !array.some((value) => isNaN(Number(value))), {
      message: "Invalid size",
    }),
  images: z
    .array(z.instanceof(File))
    .refine((array) => array.length !== 0, { message: "Please upload image" }),
});

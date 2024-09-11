import { z } from "zod";

export const addProductSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Please enter product's name",
    })
    .trim(),
  //   .regex(/^[a-zA-Z\s0-9]+$/, {
  //     message: "Name can only contain letters and spaces",
  //   }),
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
  gender: z.string().refine((val) => ["3", "4"].includes(val), {
    message: "Invalid gender",
  }),
  brand: z.string().refine((val) => ["9", "10", "12"].includes(val), {
    message: "Invalid brand",
  }),
  description: z
    .string()
    .min(1, {
      message: "Please enter product's description",
    })
    .min(40, {
      message: "Product's description must have at least 40 characters",
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

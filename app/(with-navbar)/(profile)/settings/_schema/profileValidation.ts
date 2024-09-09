import { z } from "zod";

export const profileValidation: z.ZodSchema<{
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
}> = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "Please enter your name",
    })
    .trim()
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
  lastName: z
    .optional(
      z
        .string()
        .min(1, {
          message: "Please enter your surname",
        })
        .trim()
        .regex(/^[a-zA-Z\s]+$/, {
          message: "Name can only contain letters and spaces",
        })
    )
    .or(z.literal("")),
  phoneNumber: z.optional(
    z
      .string()
      .min(9, { message: "Phone number must be at least 9 digits" })
      .max(15, { message: "Phone number must be less than 15 digits" })
      .regex(/^\+\d+/, { message: "Phone number must contain dial code" })
      .regex(/^(?!.*-).+$/g, {
        message: "Phone number must not contain hyphen",
      })
      .refine((num) => /^\d+$/.test(num.slice(1)), {
        message: "Phone number is invalid",
      })
      .or(z.literal(""))
  ),
});

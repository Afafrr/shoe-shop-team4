import { z } from "zod";

export const recoverSchema: z.ZodSchema<{
  email: string;
}> = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: "Please enter your email",
    })
    .email({
      message: "Please enter a valid email",
    })
    .refine((email) => email.length < 255, {
      message: "Email must be less than 255 characters",
    }),
});

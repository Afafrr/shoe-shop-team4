import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please enter your email",
    })
    .trim()
    .email({
      message: "Please enter a valid email",
    })
    .refine((email) => email.length < 255, {
      message: "Email must be less than 255 characters",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  rememberMe: z.boolean(),
});

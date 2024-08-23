import { z } from "zod";

export const signUpSchema: z.ZodSchema<{
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}> = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Please enter your name",
      })
      .trim()
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Name can only contain letters and spaces",
      }),
    email: z
      .string()
      .trim()
      .email({
        message: "Please enter a valid email",
      })
      .refine((email) => email.length < 255, {
        message: "Email must be less than 255 characters",
      }),
    password: z
      .string()
      .min(8, {
        message: "Please enter a password with at least 8 characters",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must contain at least one number",
      })
      .refine((password) => /[!@#$%^&*(),.?":{}|<>\-_=+]/.test(password), {
        message: "Password must contain at least one special character",
      }),
    repeatPassword: z.string().min(8, {
      message: "Please repeat your password",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

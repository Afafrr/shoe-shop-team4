import { z } from "zod";

export const resetSchema: z.ZodSchema<{
  password: string;
  confirmPassword: string;
}> = z
  .object({
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
    confirmPassword: z.string().min(8, {
      message: "Please repeat your password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

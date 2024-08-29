"use server";

import { signUpSchema } from "@/schemas/signUpSchema";
import { FormState } from "@/types/types";

export async function signUp(data: FormData): Promise<FormState> {
  try {
    const formData = Object.fromEntries(data);
    const parsed = signUpSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        data: {},
        error: {
          message: "Invalid form data",
        },
      };
    }

    const { name: username, email, password } = parsed.data;
    const response = await fetch(
      `${process.env.BASE_URL}/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    return {
      data: {},
      error: {
        message: "Something went wrong",
      },
    };
  }
}

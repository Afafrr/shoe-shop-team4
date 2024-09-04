"use server";

import { signUpSchema } from "@/schemas/signUpSchema";
import { BackResponse, ContextType } from "@/types/types";
import { ActionResponse } from "@/types/types";

export async function signUp(
  data: FormData,
  context: ContextType
): Promise<ActionResponse> {
  // receive data from form
  const formData = Object.fromEntries(data);
  // Backend form structure validation. Check if received form data follows signUp schema
  const parsed = signUpSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      data: {},
      error: {
        message: "Invalid form data",
      },
    };
  }

  // Fetch backend signUp endpoint. If form is valid, it returns the created user. If not, it returns an object with an error property.
  const { name: username, email, password } = parsed.data;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/local/register`,
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
  const result: BackResponse = await response.json();

  if ("error" in result) return result;
  return { ...result, redirect: "/auth/sign-in" };
}

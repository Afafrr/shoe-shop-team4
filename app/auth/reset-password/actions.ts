"use server";

import { resetSchema } from "@/schemas/resetSchema";
import { BackResponse, ContextType } from "@/types/types";
import { ActionResponse } from "@/types/types";
import { signOut } from "next-auth/react";

export async function recoverFn(
  data: FormData,
  context: ContextType
): Promise<ActionResponse> {
  // receive data from form
  const formData = Object.fromEntries(data);

  // Backend form structure validation. Check if received form data follows recover schema
  const parsed = resetSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      data: {},
      error: {
        message: "Invalid form data",
      },
    };
  }

  // Reset password process requires a code for security purposes. That code is passed by the backend in the url.
  const code =
    "code" in context.searchParams ? (context.searchParams.code as string) : "";

  // Fetch backend reset-password endpoint. If form is valid, it returns the created user. If not, it returns an object with an error property.
  const { password, confirmPassword } = parsed.data;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        passwordConfirmation: confirmPassword,
        code,
      }),
    }
  );
  const result: BackResponse = await response.json();

  if ("error" in result) {
    return result;
  }
  if (context.session) signOut({ redirect: false });
  return { ...result, redirect: "/auth/sign-in" };
}

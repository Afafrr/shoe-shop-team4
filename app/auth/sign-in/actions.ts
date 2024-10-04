import { z } from "zod";
import { signInSchema } from "@/schemas/signInSchema";
import { ActionResponse, ContextType } from "@/types/types";
import { signIn as Authorize } from "next-auth/react";

type AuthorizeResponse = {
  error: string | null;
  ok: boolean;
  status: number;
  url: string | null;
};

export async function signIn(
  data: FormData,
  context: ContextType
): Promise<ActionResponse> {
  // receive data from form
  const formData = Object.fromEntries(data);
  // Backend form structure validation. Check if received form data follows signIn schema
  // Booleans have been converted to strings by this point. So it's necessary to change the original Login schema
  const extendedSignInSchema = signInSchema.extend({
    rememberMe: z.enum(["true", "false"]),
  });
  const parsed = extendedSignInSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      data: {},
      error: {
        message: "Invalid form data",
      },
    };
  }
  // Check if user was redirected to Login page from other page.
  // If so, redirect to the latter. If not, redirect to home
  const callBack =
    "callbackUrl" in context.searchParams
      ? (context.searchParams.callbackUrl as string)
      : "/";

  // Call the signIn function. If successful, it creates a user session. If not, it returns an object with an error property.
  // NOTE: This behavior is independent on what we do here, it is handled by next-auth in the function itself. For example,
  //    If the function was successful but we would throw an error in this file after the function call, it will still create a session.
  //    Same for the opposite case.
  const { email, password, rememberMe } = parsed.data;
  const response: AuthorizeResponse | undefined = await Authorize(
    "credentials",
    {
      email,
      password,
      rememberMe,
      callbackUrl: callBack,
    }
  );
  if (response?.error) throw new Error(response.error);

  /*
  Form expects data to be returned in the format: {
    user: {
      id: string,
      username: string,
      email: string
    },
      redirect: string
    }
  But Login function does not return userData when successful, so an empty default must created.
  */
  const emptyUser = {
    id: 0,
    username: "",
    email: "",
  };

  return { user: emptyUser, redirect: callBack };
}

import { z } from "zod";
import { signInSchema } from "@/schemas/signInSchema";
import { ActionResponse } from "@/types/types";
import { signIn as Authorize } from "next-auth/react";

type AuthorizeResponse = {
  error: string | null;
  ok: boolean;
  status: number;
  url: string | null;
};

export async function signIn(
  data: FormData,
  context: {}
): Promise<ActionResponse> {
  // Recieve data from form
  const formData = Object.fromEntries(data);

  // Backend form structure validation. Check if recieved form data follows signIn schema
  // Booleans have been converted to strings by this point. So it's necessary to change the original Login schema
  const extendedSignInSchema = signInSchema.extend({
    rememberMe: z.enum(["true", "undefined"]),
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

  // Call the signIn function. If successfull, it creates a user session. If not, it returns an object with an error property.
  // NOTE: This behaviour is independent on what we do here, it is handled by next-auth in the function itself. For example,
  //    If the function was succesfull but we would throw an error in this file after the function call, it will still create a session.
  //    Same for the opposite case.
  const { email, password } = parsed.data;
  const response: AuthorizeResponse | undefined = await Authorize(
    "credentials",
    {
      email,
      password,
      redirect: false,
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
  But Login function does not return userData when succesfull, so an empty default must created.
  */
  const emptyUser = {
    id: "",
    username: "",
    email: "",
  };

  // Check if user was redirected to Login page from other page.
  // If so, redirect to the latter. If not, redirect to home
  const callBack = "callBack" in context ? (context.callBack as string) : "/";

  return { user: emptyUser, redirect: callBack };
}

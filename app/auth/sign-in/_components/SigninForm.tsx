"use client";

import { Box } from "@mui/material";
import { CheckboxElement } from "react-hook-form-mui";
import Form, { FormInput } from "@/components/Form/Form";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "../actions";
import Link from "next/link";

export default function SigninForm() {
  const inputs: FormInput[] = [
    {
      label: "Email",
      props: {
        name: "email",
        required: true,
        type: "email",
        placeholder: "example@mail.com",
        autoComplete: "email",
      },
    },
    {
      label: "Password",
      props: {
        name: "password",
        required: true,
        type: "password",
        placeholder: "at least 8 characters",
        autoComplete: "new-password",
      },
    },
  ];
  const defaultForm = {
    email: "",
    password: "",
    rememberMe: false,
  };

  return (
    <Form
      defaultForm={defaultForm}
      inputs={inputs}
      submitFn={signIn}
      schema={signInSchema}
      buttonText="Sign in"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CheckboxElement name="rememberMe" label="Remember me" />
        <Link href={"../auth/forgot-password"} style={{ color: "red" }}>
          Forgot password?
        </Link>
      </Box>
    </Form>
  );
}

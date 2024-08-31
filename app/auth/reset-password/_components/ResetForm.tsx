"use client";

import Form, { FormInput } from "@/components/Form/Form";
import { resetSchema } from "@/schemas/resetSchema";
import { recoverFn } from "../actions";

export default function ResetForm() {
  const inputs: FormInput[] = [
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
    {
      label: "Confirm password",
      props: {
        name: "confirmPassword",
        required: true,
        type: "password",
        placeholder: "at least 8 characters",
        autoComplete: "new-password",
      },
    },
  ];

  return (
    <Form
      inputs={inputs}
      submitFn={recoverFn}
      schema={resetSchema}
      buttonText="Reset password"
    />
  );
}

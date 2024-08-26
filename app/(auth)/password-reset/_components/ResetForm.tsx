"use client";

import Form, { FormInput } from "@/components/Form/Form";
import { resetSchema } from "@/schemas/resetSchema";

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

  function resetFn(data: any) {
    console.log(data);
  }

  return (
    <Form
      inputs={inputs}
      submitFn={resetFn}
      schema={resetSchema}
      buttonText="Reset password"
    />
  );
}

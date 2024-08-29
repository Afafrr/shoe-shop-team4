"use client";

import Form, { FormInput } from "@/components/Form/Form";
import { recoverSchema } from "@/schemas/recoverSchema";

export default function RecoverForm() {
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
  ];

  function recoverFn(data: any) {
    console.log(data);
  }

  return (
    <Form
      inputs={inputs}
      submitFn={recoverFn}
      schema={recoverSchema}
      buttonText="Reset password"
    />
  );
}

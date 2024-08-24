"use client";

import Form, { FormInput } from "@/components/Form/Form";
import { signUpSchema } from "@/schemas/signUpSchema";

export default function SignupForm() {
  const inputs: FormInput[] = [
    {
      label: "Name",
      props: {
        name: "name",
        required: true,
        placeholder: "Hayman Andrews",
        type: "text",
        autoComplete: "name",
      },
    },
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
    {
      label: "Repeat password",
      props: {
        name: "repeatPassword",
        required: true,
        type: "password",
        placeholder: "at least 8 characters",
        autoComplete: "new-password",
      },
    },
  ];

  function signUp(data: any) {
    console.log(data);
  }

  return <Form inputs={inputs} submitFn={signUp} schema={signUpSchema} />;
}

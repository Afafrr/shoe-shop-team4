"use client";

import Form, { FormInput } from "@/components/Form/Form";
import { signUpSchema } from "@/schemas/signUpSchema";
import { signUp } from "../../actions";

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
      },
    },
    {
      label: "Repeat password",
      props: {
        name: "repeatPassword",
        required: true,
        type: "password",
        placeholder: "at least 8 characters",
      },
    },
  ];

  return <Form inputs={inputs} submitFn={signUp} schema={signUpSchema} />;
}

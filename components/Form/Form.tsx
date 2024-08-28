"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  TextFieldElementProps,
  FieldValues,
} from "react-hook-form-mui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import Input from "@components/Input/Input";
import { FormState } from "@/app/sign-up/actions";
import WarningIcon from "./WarningIcon";

export interface FormInput {
  label: string;
  props: TextFieldElementProps;
}

export default function Form({
  inputs,
  submitFn,
  schema,
}: {
  inputs: FormInput[];
  submitFn: (data: FormData) => Promise<FormState>;
  schema: z.ZodSchema<FieldValues>;
}) {
  const defaultValues = inputs.reduce(
    (acc: { [key: string]: string }, input) => {
      acc[input.props.name] = "";
      return acc;
    },
    {}
  );

  const formContext = useForm<FieldValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = formContext;

  const { mutate, data, error, isPending } = useMutation<
    FormState,
    Error,
    FieldValues
  >({
    mutationKey: ["signUp"],
    mutationFn: async (data: FieldValues) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const result = await submitFn(formData);
      return result;
    },
    onSuccess: ({ data }) => {
      console.log(data);
      // reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <FormContainer
      formContext={formContext}
      handleSubmit={handleSubmit((data) => mutate(data))}
    >
      <Stack spacing={"24px"}>
        {error || data ? (
          <Typography
            color={"red"}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            <WarningIcon /> {error?.message || data?.error?.message}
          </Typography>
        ) : null}

        {inputs.map((input) => (
          <Input
            key={input.label}
            label={input.label}
            props={input.props}
            disabled={isPending}
          />
        ))}

        <Button
          type="submit"
          disabled={isPending}
          sx={{
            py: "25px",
            borderRadius: "5.58px",
            backgroundColor: "#FE645E",
            color: "white",
            height: "34px",
            fontWeight: 500,
            textTransform: "none",
          }}
          style={{
            marginTop: "54.55px",
          }}
        >
          Sign up
        </Button>
      </Stack>
    </FormContainer>
  );
}

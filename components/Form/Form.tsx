"use client";

import { ReactNode } from "react";

import { Button, Stack, Container, Typography } from "@mui/material";
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
import { ActionResponse } from "@/types/types";
import WarningIcon from "./WarningIcon";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export interface FormInput {
  label: string;
  props: TextFieldElementProps;
}

type FormProps = {
  inputs: FormInput[];
  submitFn: (data: FormData, context: {}) => Promise<ActionResponse>;
  schema: z.ZodSchema<FieldValues>;
  buttonText: string;
  children?: ReactNode;
};

export default function Form({
  inputs,
  submitFn,
  schema,
  buttonText,
  children,
}: FormProps) {
  const searchParams = useSearchParams();
  const context = Object.fromEntries(searchParams.entries());
  const router = useRouter();

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
  const { handleSubmit } = formContext;

  const { mutate, error, isPending } = useMutation<
    ActionResponse,
    Error,
    FieldValues
  >({
    mutationKey: ["signUp"],
    mutationFn: async (data: FieldValues) => {
      const formData = new FormData();
      console.log("recieved data: ", data);
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      const result = await submitFn(formData, context);

      if ("error" in result) throw new Error(result.error.message);
      return result;
    },
    onSuccess: (response: ActionResponse) => {
      if ("redirect" in response) router.push(response.redirect);
    },
    onError: (error) => {
      console.log("Error in mutation: ", error);
    },
  });

  return (
    <Container sx={{ padding: { xs: "0", md: "0" }, width: { md: "80%" } }}>
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit((data) => mutate(data))}
      >
        <Stack spacing={{ xs: "24px", md: "15px" }}>
          {error && (
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
              <WarningIcon /> {error.message}
            </Typography>
          )}

          {inputs.map((input) => (
            <Input
              key={input.label}
              label={input.label}
              props={input.props}
              disabled={isPending}
            />
          ))}
          {children}
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
            {buttonText}
          </Button>
        </Stack>
      </FormContainer>
    </Container>
  );
}

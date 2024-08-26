import { Button, Stack, Box, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  TextFieldElementProps,
  FieldValues,
} from "react-hook-form-mui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@components/Input/Input";
import { ReactNode } from "react";

export interface FormInput {
  label: string;
  props: TextFieldElementProps;
}

export default function Form({
  inputs,
  submitFn,
  schema,
  buttonText,
  children,
}: {
  inputs: FormInput[];
  submitFn: (data: FieldValues) => void;
  schema: z.ZodSchema<FieldValues>;
  buttonText: string;
  children?: ReactNode;
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
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = formContext;

  const onSubmit = async (data: FieldValues) => {
    submitFn(data);
    if (isSubmitSuccessful) {
      formContext.reset();
    }
  };

  return (
    <Container sx={{ padding: { xs: "0", md: "0" }, width: { md: "80%" } }}>
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={{ xs: "24px", md: "15px" }}>
          {inputs.map((input) => (
            <Input key={input.label} label={input.label} props={input.props} />
          ))}
          {children}
          <Button
            type="submit"
            disabled={isSubmitting}
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

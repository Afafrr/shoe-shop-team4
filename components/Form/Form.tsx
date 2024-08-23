import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  TextFieldElementProps,
  FieldValues,
} from "react-hook-form-mui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@components/Input/Input";

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
  submitFn: (data: FieldValues) => void;
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
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formContext;

  return (
    <FormContainer
      formContext={formContext}
      handleSubmit={handleSubmit(submitFn)}
    >
      <Stack spacing={"24px"}>
        {inputs.map((input) => (
          <Input key={input.label} label={input.label} props={input.props} />
        ))}

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
          Sign up
        </Button>
      </Stack>
    </FormContainer>
  );
}

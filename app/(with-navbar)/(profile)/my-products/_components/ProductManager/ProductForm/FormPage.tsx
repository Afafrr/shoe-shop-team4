"use client";
import { Stack, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormContainer, FieldValues } from "react-hook-form-mui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { ProductFormSchema } from "@/types/Product";
import WarningIcon from "@/components/Form/WarningIcon";
import ProductForm from "./Form";
import { ProductActionResponse, ActionFunction } from "@/types/Product";

/* This component contains the main structure of the product form and works as the form's manager:
 * global form states, form initialization, submit actions, etc.
 * This are then made accessible to the actual form with all inputs
 * Takes schema for validation, submitFn for submission,
 *  defaultForm(optional) for preloading the form with values, and productId(optional) for handling submissions
 */
type FormProps = {
  // function to handle submission
  submitFn: ActionFunction;
  // optional function to trigger side effect after successful submission
  successFn?: () => void;
  // schema to validate form fields
  schema: z.ZodSchema<FieldValues>;
  // default form values
  defaultForm?: ProductFormSchema;
};

export const emptyFormValues = {
  name: "",
  price: undefined,
  categories: [],
  color: [],
  gender: "3",
  brand: "9",
  description: "",
  sizes: [],
  images: [],
};

export default function ProductFormPage({
  submitFn,
  successFn,
  schema,
  defaultForm,
}: FormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  // Store session and Url parameters for the ServerActions
  const context = {
    searchParams: Object.fromEntries(searchParams.entries()),
    session,
  };

  const defaultValues = defaultForm || emptyFormValues;

  // React-hook-form
  const formContext = useForm<ProductFormSchema>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = formContext;

  const mutateFn = async (data: ProductFormSchema) => {
    const formData = toFormData(data);

    let result = await submitFn(formData, context);

    if ("error" in result) throw new Error(result.error.message);
    return result;
  };

  // tanstack query for submission
  const { mutate, error, isPending } = useMutation<
    ProductActionResponse,
    Error,
    ProductFormSchema
  >({
    mutationKey: ["addProduct"],
    mutationFn: mutateFn,
    onSuccess: (response: ProductActionResponse) => {
      console.log("Result: ", response);
      if (successFn) successFn();
      if ("redirect" in response && response.redirect !== "") {
        router.push(response.redirect);
      }
    },
    onError: (error) => {
      console.log("Error in mutation: ", error);
    },
  });

  return (
    <Container disableGutters sx={{ width: { lg: "100%" } }}>
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit((data) => mutate(data))}
      >
        <Stack spacing={{ xs: "24px", lg: "15px" }} sx={{ width: "100%" }}>
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
          <ProductForm isPending={isPending}></ProductForm>
        </Stack>
      </FormContainer>
    </Container>
  );
}

function toFormData(data: ProductFormSchema | FieldValues) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.every((item) => item instanceof File)) {
        value.forEach((file) => {
          formData.append("files", file);
        });
      } else {
        formData.append(key, JSON.stringify(value));
      }
    } else {
      formData.append(key, value as string);
    }
  });
  return formData;
}

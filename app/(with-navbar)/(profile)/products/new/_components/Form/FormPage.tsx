"use client";

import { ReactNode } from "react";

import { Stack, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormContainer, FieldValues } from "react-hook-form-mui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { ContextType } from "@/types/types";
import WarningIcon from "@/components/Form/WarningIcon";
import ProductForm from "./Form";
import { ProductActionResponse } from "@/types/productTypes";

export type ProductFormSchema = {
  name: string;
  price: number;
  color: string[];
  gender: string;
  brand: string;
  description: string;
  sizes: string[];
  image: File[];
};

type FormProps = {
  submitFn: (
    data: FormData,
    context: ContextType
  ) => Promise<ProductActionResponse>;
  schema: z.ZodSchema<FieldValues>;
  children?: ReactNode;
};

export default function Form({ submitFn, schema, children }: FormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const context = {
    searchParams: Object.fromEntries(searchParams.entries()),
    session,
  };

  const defaultValues = {
    name: "",
    price: 0,
    color: [],
    gender: "3",
    brand: "9",
    description: "",
    sizes: [],
    image: [],
  };

  const formContext = useForm<ProductFormSchema>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = formContext;

  const mutateFn = async (data: ProductFormSchema) => {
    const formData = toFormData(data);
    const result = await submitFn(formData, context);
    if ("error" in result) throw new Error(result.error.message);
    return result;
  };

  const { mutate, error, isPending } = useMutation<
    ProductActionResponse,
    Error,
    ProductFormSchema
  >({
    mutationKey: ["addProduct"],
    mutationFn: mutateFn,
    onSuccess: (response: ProductActionResponse) => {
      console.log("Result: ", response);
      if ("redirect" in response) router.push(response.redirect);
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

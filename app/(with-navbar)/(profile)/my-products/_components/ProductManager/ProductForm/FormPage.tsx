"use client";

import { useEffect, useState } from "react";

import { Stack, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormContainer, FieldValues } from "react-hook-form-mui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { ProductFormSchema, ProductOptions } from "@/types/Product";
import WarningIcon from "@/components/Form/WarningIcon";
import ProductForm from "./Form";
import { ProductActionResponse, ActionFunction } from "@/types/Product";
import { getOptions } from "@/utils/getOptions";
import { JWT } from "next-auth/jwt";
import LoadingPage from "@/components/Loading/LoadingPage";

/* This component contains the main structure of the product form and works as the form's manager:
 * global form states, form initialization, submit actions, etc.
 * This are then made accessible to the actual form with all inputs
 * Takes schema for validation, submitFn for submission,
 *  defaultForm(optional) for preloading the form with values, and productId(optional) for handling submissions
 */
type FormProps = {
  submitFn: ActionFunction;
  schema: z.ZodSchema<FieldValues>;
  defaultForm?: ProductFormSchema;
  productId?: string;
};

export default function ProductFormPage({
  submitFn,
  schema,
  defaultForm,
  productId,
}: FormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  // Store session and Url parameters for the ServerActions
  const context = {
    searchParams: Object.fromEntries(searchParams.entries()),
    session,
  };

  const initialValue = {
    colors: null,
    brands: null,
    genders: null,
    sizes: null,
  };
  // Initialize state for product options(colors, brands, genders, etc.)
  const [options, setOptions] = useState<ProductOptions>(initialValue);
  const [loading, setLoading] = useState(true);

  // Fetch options from backend
  useEffect(() => {
    async function fetchOptions() {
      try {
        let data = await getOptions(session!.user.jwt as JWT);
        setOptions(data);
      } catch (error) {
        console.error("Failed to fetch options", error);
      } finally {
        setLoading(false);
      }
    }
    if (status == "loading") return;
    fetchOptions();
  }, [status, session]);

  const defaultValues = defaultForm || {
    name: "",
    price: 0,
    color: [],
    gender: "3",
    brand: "9",
    description: "",
    sizes: [],
    image: [],
  };

  // React-hook-form
  const formContext = useForm<ProductFormSchema>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = formContext;

  const mutateFn = async (data: ProductFormSchema) => {
    const formData = toFormData(data);

    let result = productId
      ? await submitFn(formData, context, productId)
      : await submitFn(formData, context);
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
      if ("redirect" in response) router.push(response.redirect);
    },
    onError: (error) => {
      console.log("Error in mutation: ", error);
    },
  });

  // wait for options to be loaded
  if (loading) {
    return <LoadingPage width="100%" height="800px" />;
  }

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
          <ProductForm
            isPending={isPending}
            isLoading={loading}
            options={options}
          ></ProductForm>
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

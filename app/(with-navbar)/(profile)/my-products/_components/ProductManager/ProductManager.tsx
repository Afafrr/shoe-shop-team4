"use client";
import { Container, Stack, Typography } from "@mui/material";
import ProductFormPage from "./ProductForm/FormPage";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import { ProductFormSchema, ActionFunction } from "@/types/Product";

// This page is a template for a product form. Works for both Add product and Edit product components.

type pageType = {
  header: string;
  subheader?: string;
  formActions: {
    schema: z.ZodSchema<FieldValues>;
    submitAction: ActionFunction;
    defaultForm?: ProductFormSchema;
  };
};

export default function ProductManager({
  header,
  subheader,
  formActions,
}: pageType) {
  const { schema, submitAction, defaultForm } = formActions;

  return (
    <Container
      id="form-page-container"
      disableGutters
      sx={{
        maxWidth: "none",
        position: "relative",
        padding: "40px",
      }}
    >
      <Stack
        mr={{ xs: "20px", md: "0" }}
        spacing={"25px"}
        sx={{ alignItems: { md: "flex-start" } }}
      >
        <PageTitle header={header} subheader={subheader} />
        <ProductFormPage
          schema={schema}
          submitFn={submitAction}
          defaultForm={defaultForm}
        />
      </Stack>
    </Container>
  );
}

//Page title
type TitleProps = { header: string; subheader?: string };
function PageTitle({ header, subheader }: TitleProps) {
  return (
    <Stack
      spacing={"15px"}
      sx={{
        alignItems: { md: "flex-start" },
        width: { md: "80%" },
      }}
    >
      <Typography fontSize={30} fontWeight={500} lineHeight={"35px"}>
        {header}
      </Typography>

      {subheader && <Typography fontWeight={300}>{subheader}</Typography>}
    </Stack>
  );
}
